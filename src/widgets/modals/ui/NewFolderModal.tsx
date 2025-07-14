import {observer} from 'mobx-react-lite'
import {useState} from 'react'
import {useFoldersState, useModalsState, useToastState} from '~/shared/state'
import {Modal, Button, Input} from '~/shared/ui'
import type {CommonModalProps} from '../types'
import {DesignsAddedToFolderToast} from '../../toasts'

type NewFolderModalProps = CommonModalProps & {
    addSelectionOnSuccess?: boolean
}

export const NewFolderModal = observer(
    ({mountNode, addSelectionOnSuccess = false}: NewFolderModalProps) => {
        const modalsState = useModalsState()
        const foldersState = useFoldersState()
        const toastState = useToastState()
        const [folderName, setFolderName] = useState('')

        const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const newFolderId = crypto.randomUUID()

            foldersState.addFolder({
                id: newFolderId,
                name: folderName,
                designsIds: [],
            })

            if (addSelectionOnSuccess) {
                foldersState.addSelectedDesignsToFolder(newFolderId)
                toastState.setActiveToast(DesignsAddedToFolderToast)
            }

            modalsState.closeModal()
        }

        return (
            <Modal
                className="w-[480px] p-10"
                mountNode={mountNode}
                title="Create a folder"
                showCloseButton
                onClose={() => modalsState.closeModal()}
            >
                <form onSubmit={onCreate}>
                    <div className="flex flex-col gap-8">
                        <Input
                            label="Folder name"
                            value={folderName}
                            onChange={e => setFolderName(e.target.value)}
                        />
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="secondary"
                                onClick={() => modalsState.closeModal()}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={folderName.length === 0}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    },
)

import {observer} from 'mobx-react-lite'
import {useState} from 'react'
import {useFoldersState, useModalsState} from '../providers/root'
import type {CommonModalProps} from '.'
import {Modal} from '../ui-kit/Modal'
import {Button} from '../ui-kit/Button'
import {Input} from '../ui-kit/Input'

export const NewFolderModal = observer(({mountNode}: CommonModalProps) => {
    const modalsState = useModalsState()
    const foldersState = useFoldersState()
    const [folderName, setFolderName] = useState('')

    const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        foldersState.addFolder({
            id: crypto.randomUUID(),
            name: folderName,
            designsIds: [],
        })
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
})

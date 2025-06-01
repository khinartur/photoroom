import {observer} from 'mobx-react-lite'
import {Modal} from '../ui-kit/Modal'
import {useContext, useState} from 'react'
import {ModalsStateContext} from '../state/modals'
import type {CommonModalProps} from '.'
import {Button} from '../ui-kit/Button'
import {Input} from '../ui-kit/Input'

export const NewFolderModal = observer(({mountNode}: CommonModalProps) => {
    const modalsState = useContext(ModalsStateContext)
    const [folderName, setFolderName] = useState('')

    const onCreate = () => {
        console.log('onCreate', folderName)
    }

    return (
        <Modal
            className="w-[480px] p-10"
            mountNode={mountNode}
            title="Create a folder"
            onClose={() => modalsState.closeModal()}
        >
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
                    <Button onClick={onCreate}>Create</Button>
                </div>
            </div>
        </Modal>
    )
})

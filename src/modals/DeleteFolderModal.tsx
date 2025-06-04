import {observer} from 'mobx-react-lite'
import {useFoldersState, useModalsState} from '../providers/root'
import type {CommonModalProps} from '.'
import {Modal} from '../ui-kit/Modal'
import {Button} from '../ui-kit/Button'

type DeleteFolderModalProps = CommonModalProps & {
    folderId: string
}

export const DeleteFolderModal = observer(
    ({mountNode, folderId}: DeleteFolderModalProps) => {
        const modalsState = useModalsState()
        const foldersState = useFoldersState()

        const onDelete = () => {
            foldersState.deleteFolder(folderId)
            modalsState.closeModal()
        }

        return (
            <Modal
                className="w-[480px] p-10"
                mountNode={mountNode}
                title="Delete folder and its designs"
                onClose={() => modalsState.closeModal()}
            >
                <div className="flex flex-col gap-8">
                    <span className="text-sm text-content-secondary">
                        Deleting this folder will delete its content everywhere.
                    </span>
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => modalsState.closeModal()}
                        >
                            Cancel
                        </Button>
                        <Button variant="negative" onClick={onDelete}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    },
)

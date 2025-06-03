import {observer} from 'mobx-react-lite'
import {useDesignsState, useModalsState} from '../providers/root'
import type {CommonModalProps} from '.'
import {Modal} from '../ui-kit/Modal'
import {Button} from '../ui-kit/Button'

type DeleteDesignModalProps = CommonModalProps & {
    designId: string
}

export const DeleteDesignModal = observer(
    ({mountNode, designId}: DeleteDesignModalProps) => {
        const modalsState = useModalsState()
        const designsState = useDesignsState()

        const onDelete = () => {
            designsState.deleteDesign(designId)
            modalsState.closeModal()
        }

        return (
            <Modal
                className="w-[480px] p-10"
                mountNode={mountNode}
                title="Delete design permanently?"
                onClose={() => modalsState.closeModal()}
            >
                <div className="flex flex-col gap-8">
                    <span className="text-sm text-content-secondary">
                        Are you sure you want to delete this design permanently?
                        This action can't be undone.
                    </span>
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => modalsState.closeModal()}
                        >
                            Cancel
                        </Button>
                        <Button variant="negative" onClick={onDelete}>
                            Delete permanently
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    },
)

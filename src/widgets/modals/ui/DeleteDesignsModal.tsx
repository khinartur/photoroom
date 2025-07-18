import {observer} from 'mobx-react-lite'
import {useDesignsState, useModalsState} from '~/shared/state'
import type {Design} from '~/shared/types'
import {Modal, Button} from '~/shared/ui'
import type {CommonModalProps} from '../types'

type DeleteDesignsModalProps = CommonModalProps & {
    designsIds: Design['id'][]
}

export const DeleteDesignsModal = observer(
    ({mountNode, designsIds}: DeleteDesignsModalProps) => {
        const modalsState = useModalsState()
        const designsState = useDesignsState()

        const onDelete = () => {
            designsState.deleteDesigns(designsIds)
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
                        {designsIds.length === 1
                            ? "Are you sure you want to delete this design permanently? This action can't be undone."
                            : `Are you sure you want to delete ${designsIds.length} designs permanently? This action can't be undone.`}
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

import {observer} from 'mobx-react-lite'
import {
    useFoldersState,
    useModalsState,
    useSelectionState,
    useToastState,
} from '~/shared/state'
import {CloseIcon, FolderIcon, TrashIcon} from '~/shared/icons'
import {tcn} from '~/shared/utils'
import {Button} from '~/shared/ui'
import {DesignsAddedToFolderToast} from '~/widgets/toasts'

export const SelectionBar = observer(() => {
    const modalsState = useModalsState()
    const selectionState = useSelectionState()
    const foldersState = useFoldersState()
    const toastState = useToastState()

    if (selectionState.selectionFolderId === null) {
        return null
    }

    return (
        <div className="fixed bottom-0 left-[280px] right-0 h-[96px] px-8 pb-8">
            <div
                className={tcn(
                    'flex items-center justify-between h-16 w-full max-w-[720px] p-3 mx-auto',
                    'bg-background-accent rounded-[10px] text-content-white-primary',
                    {
                        'justify-start': selectionState.selection.length === 0,
                    },
                )}
            >
                <div className="flex items-center">
                    <Button
                        className="mr-3"
                        icon={<CloseIcon />}
                        onClick={() => {
                            selectionState.setSelectionFolderId(null)
                        }}
                    />
                    <span className="text-sm font-bold">
                        {selectionState.selection.length > 0
                            ? `${selectionState.selection.length} selected`
                            : 'None selected'}
                    </span>
                </div>
                <div className="flex items-center">
                    {selectionState.selection.length > 0 &&
                        foldersState.activeFolder === null &&
                        selectionState.selectionFolder !== null && (
                            <Button
                                icon={<FolderIcon />}
                                onClick={() => {
                                    foldersState.addSelectedDesignsToFolder()
                                    toastState.setActiveToast(
                                        DesignsAddedToFolderToast,
                                    )
                                }}
                            >
                                {`Add to "${selectionState.selectionFolder.name}"`}
                            </Button>
                        )}
                    {selectionState.selection.length > 0 &&
                        selectionState.selectionFolderId === 'HOME' && (
                            <Button
                                icon={<FolderIcon />}
                                onClick={() => {
                                    modalsState.openAddToFolderModal()
                                }}
                            >
                                Add to folder
                            </Button>
                        )}
                    {selectionState.selection.length > 0 && (
                        <Button
                            icon={<TrashIcon />}
                            onClick={() => {
                                modalsState.openDeleteDesignModal(
                                    selectionState.selection,
                                )
                            }}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
})

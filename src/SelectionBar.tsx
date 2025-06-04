import {observer} from 'mobx-react-lite'
import {useFoldersState, useSelectionState} from './providers/root'
import {Button} from './ui-kit/Button'
import {CloseIcon, FolderIcon} from './icons'
import {tcn} from './utils/tcn'

export const SelectionBar = observer(() => {
    const selectionState = useSelectionState()
    const foldersState = useFoldersState()

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
                {selectionState.selection.length > 0 &&
                    selectionState.selectionFolder !== null && (
                        <Button
                            icon={<FolderIcon />}
                            onClick={() =>
                                foldersState.addSelectedDesignsToFolder()
                            }
                        >
                            {`Add to "${selectionState.selectionFolder.name}"`}
                        </Button>
                    )}
            </div>
        </div>
    )
})

import {observer} from 'mobx-react-lite'
import {tcn} from '~/shared/utils'
import {ChevronRightIcon, DotsIcon, FolderIcon, PlusIcon} from '~/shared/icons'
import {Button, Dropdown, DeleteMenuItem, PageLayout} from '~/shared/ui'
import {
    useAppState,
    useFoldersState,
    useModalsState,
    useSelectionState,
} from '~/shared/state'
import {DesignPreviewCard} from '~/widgets/design-preview-card'

export const FolderPage = observer(() => {
    const appState = useAppState()
    const modalsState = useModalsState()
    const foldersState = useFoldersState()
    const selectionState = useSelectionState()

    const activeFolder = foldersState.activeFolder

    if (!activeFolder) {
        return null
    }

    return (
        <PageLayout
            title={
                <div className="flex items-center">
                    <span
                        className="text-content-tertiary font-bold text-[29px] cursor-pointer"
                        onClick={() => {
                            appState.goToDesignsPage()
                        }}
                    >
                        Designs
                    </span>
                    <div className="flex items-center justify-center text-content-tertiary size-6 mt-1.5">
                        <ChevronRightIcon />
                    </div>
                    <span className="text-content-primary font-bold text-[29px]">
                        {activeFolder.name}
                    </span>
                </div>
            }
            headerRight={
                <Dropdown
                    align="end"
                    trigger={<Button variant="secondary" icon={<DotsIcon />} />}
                    content={
                        <div
                            className={tcn(
                                'w-[240px] bg-background-primary outline-none p-1',
                                'border border-misc-border rounded-[10px]',
                            )}
                            onClick={e => e.stopPropagation()}
                        >
                            <DeleteMenuItem
                                onClick={() =>
                                    modalsState.openDeleteFolderModal(
                                        activeFolder.id,
                                    )
                                }
                            />
                        </div>
                    }
                />
            }
        >
            {activeFolder.designsIds.length === 0 && (
                <div className="flex flex-1 items-center justify-center">
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center justify-center size-10 text-content-tertiary">
                                <FolderIcon />
                            </div>
                            <h1 className="text-xl font-semibold text-content-primary">
                                Add designs to this folder
                            </h1>
                        </div>
                        <Button
                            icon={<PlusIcon />}
                            onClick={() => {
                                selectionState.setSelectionFolderId(
                                    activeFolder.id,
                                )
                                appState.goToDesignsPage()
                            }}
                        >
                            Add designs
                        </Button>
                    </div>
                </div>
            )}
            {activeFolder.designsIds.length > 0 && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(176px,1fr))] gap-4 pb-4">
                    {activeFolder.designsIds.map(designId => (
                        <DesignPreviewCard key={designId} designId={designId} />
                    ))}
                </div>
            )}
        </PageLayout>
    )
})

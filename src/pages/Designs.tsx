import {observer} from 'mobx-react-lite'
import {BrushIcon, NewFolderIcon, PlusIcon} from '../icons'
import {Button} from '../ui-kit/Button'
import {Category} from '../ui-kit/Category'
import {Folder} from '../ui-kit/Folder'
import {PageLayout} from '../ui-kit/PageLayout'
import {
    useAppState,
    useDesignsState,
    useFoldersState,
    useModalsState,
} from '../providers/root'
import {DesignPreviewCard} from '../DesignPreviewCard'

export const DesignsPage = observer(() => {
    const appState = useAppState()
    const modalsState = useModalsState()
    const designsState = useDesignsState()
    const foldersState = useFoldersState()

    const onFolderOpen = (folderId: string) => {
        appState.goToFolderPage(folderId)
    }

    return (
        <PageLayout
            title="Designs"
            headerRight={
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        icon={<NewFolderIcon />}
                        onClick={() => modalsState.openNewFolderModal()}
                    >
                        New folder
                    </Button>
                    <Button
                        icon={<PlusIcon />}
                        onClick={() => appState.goToCreatePage()}
                    >
                        Create new
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col flex-1 gap-6">
                {foldersState.folders.length === 0 &&
                    designsState.designs.length === 0 && (
                        <div className="flex flex-1 items-center justify-center">
                            <div className="flex flex-col items-center gap-6">
                                <div className="flex items-center justify-center size-10 text-content-tertiary">
                                    <BrushIcon />
                                </div>
                                <div className="flex flex-col gap-2 text-center">
                                    <h1 className="text-xl font-semibold text-content-primary">
                                        No designs yet
                                    </h1>
                                    <p className="text-content-secondary text-sm">
                                        Your designs will show up here. Get
                                        started by creating your first design!
                                    </p>
                                </div>
                                <Button
                                    icon={<PlusIcon />}
                                    onClick={() => appState.goToCreatePage()}
                                >
                                    Create a design
                                </Button>
                            </div>
                        </div>
                    )}
                {foldersState.folders.length > 0 && (
                    <Category
                        title="Folders"
                        content={
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-2">
                                {foldersState.folders.map(folder => (
                                    <Folder
                                        key={folder.id}
                                        folder={folder}
                                        onClick={onFolderOpen}
                                    />
                                ))}
                            </div>
                        }
                    />
                )}
                {designsState.designs.length > 0 && (
                    <Category
                        title="Recent Designs"
                        content={
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(176px,1fr))] gap-4 pb-4">
                                {designsState.designs.map(design => (
                                    <DesignPreviewCard
                                        key={design.id}
                                        designId={design.id}
                                    />
                                ))}
                            </div>
                        }
                    />
                )}
            </div>
        </PageLayout>
    )
})

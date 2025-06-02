import {observer} from 'mobx-react-lite'
import {NewFolderIcon, PlusIcon} from '../icons'
import {Button} from '../ui-kit/Button'
import {Category} from '../ui-kit/Category'
import {DesignPreviewCard} from '../ui-kit/DesignPreviewCard'
import {Folder} from '../ui-kit/Folder'
import {PageLayout} from '../ui-kit/PageLayout'
import {AppStateContext} from '../state/app'
import {useContext} from 'react'
import {ModalsStateContext} from '../state/modals'
import {FoldersStateContext} from '../state/folders'

export const DesignsPage = observer(() => {
    const appState = useContext(AppStateContext)
    const modalsState = useContext(ModalsStateContext)
    const foldersState = useContext(FoldersStateContext)

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
            <div className="flex flex-col gap-6">
                {foldersState.folders.length > 0 && (
                    <Category
                        title="Folders"
                        content={
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-2">
                                {foldersState.folders.map(folder => (
                                    <Folder key={folder.id} folder={folder} />
                                ))}
                            </div>
                        }
                    />
                )}
                <Category
                    title="Recent Designs"
                    content={
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(176px,1fr))] gap-4 pb-4">
                            <DesignPreviewCard previewSrc="/preview0.png" />
                            <DesignPreviewCard previewSrc="/preview1.png" />
                        </div>
                    }
                />
            </div>
        </PageLayout>
    )
})

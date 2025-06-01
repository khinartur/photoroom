import {observer} from 'mobx-react-lite'
import {NewFolderIcon, PlusIcon} from '../icons'
import {Button} from '../ui-kit/Button'
import {Category} from '../ui-kit/Category'
import {DesignPreviewCard} from '../ui-kit/DesignPreviewCard'
import {Folder} from '../ui-kit/Folder'
import {PageLayout} from '../ui-kit/PageLayout'
import {useContext} from 'react'
import {AppStateContext} from '../state/app'

export const DesignsPage = observer(() => {
    const appState = useContext(AppStateContext)

    return (
        <PageLayout
            title="Designs"
            headerRight={
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        icon={<NewFolderIcon />}
                        onClick={() => {
                            console.log('new folder')
                        }}
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
                <Category
                    title="Folders"
                    content={
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-2">
                            <Folder name="New Folder 2" />
                            <Folder name="My designs" />
                        </div>
                    }
                />
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

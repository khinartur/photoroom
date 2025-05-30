import {NewFolderIcon, PlusIcon} from './icons'
import {Button} from './ui-kit/Button'
import {Category} from './ui-kit/Category'
import {DesignPreviewCard} from './ui-kit/DesignPreviewCard'
import {Folder} from './ui-kit/Folder'

export const Content = () => {
    return (
        <div className="flex-1 overflow-y-auto px-8 pb-[100px]">
            <div className="flex h-24 items-center justify-between mb-6">
                <span className="text-content-primary font-bold text-[29px]">
                    Designs
                </span>
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
                        onClick={() => {
                            console.log('create new')
                        }}
                    >
                        Create new
                    </Button>
                </div>
            </div>
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
        </div>
    )
}

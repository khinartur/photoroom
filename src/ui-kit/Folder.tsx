import {FolderIcon} from '../icons'
import type {Folder as FolderType} from '../state/folders'

type FolderProps = {
    folder: FolderType
    onClick: (folderId: string) => void
}

export const Folder = ({folder, onClick}: FolderProps) => {
    return (
        <button
            type="button"
            className="flex items-center gap-2 border rounded-[10px] p-2 border-misc-border cursor-pointer"
            onClick={() => onClick(folder.id)}
        >
            <div className="flex items-center justify-center size-16 bg-background-subdued">
                <div className="flex items-center justify-center size-6 rounded-[3px] text-content-secondary dark:text-content-primary">
                    <FolderIcon />
                </div>
            </div>
            <span className="text-content-primary text-[14px] font-semibold">
                {folder.name}
            </span>
        </button>
    )
}

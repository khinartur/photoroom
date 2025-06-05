import {CheckIcon} from './icons'
import type {Toast} from './state/toast'

export const DesignsAddedToFolderToast: Toast = {
    description: (
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-6 rounded-full bg-background-positive">
                <div className="flex items-center justify-center size-6 text-content-white-primary">
                    <CheckIcon />
                </div>
            </div>
            <span className="text-sm font-medium text-content-primary">
                Designs added to folder
            </span>
        </div>
    ),
}

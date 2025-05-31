import {ExpandIcon} from './icons'
import {Avatar} from './ui-kit/Avatar'

export const User = () => {
    return (
        <div className="flex gap-4 items-center cursor-pointer p-3 hover:bg-background-subdued-hover rounded-[6px]">
            <Avatar firstName="John" />
            <div className="flex flex-1 flex-col">
                <span className="text-content-primary font-semibold text-[14px]">
                    Personal space
                </span>
                <span className="text-content-secondary font-medium text-[12px]">
                    Only you
                </span>
            </div>
            <div className="flex items-center justify-center size-5">
                <ExpandIcon />
            </div>
        </div>
    )
}

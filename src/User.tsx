import {Avatar} from './ui-kit/Avatar'

export const User = () => {
    return (
        <div className="flex items-center">
            <div>
                <Avatar firstName="John" />
                <div className="flex flex-col">
                    <span className="text-content-primary font-medium text-[14px]">
                        John Doe
                    </span>
                    <span className="text-content-secondary font-medium text-[12px]"></span>
                </div>
            </div>
        </div>
    )
}

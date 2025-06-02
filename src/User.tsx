import {Avatar} from './ui-kit/Avatar'

type UserProps = {
    icon: React.ReactNode
    onClick?: () => void
}

export const User = ({icon, onClick}: UserProps) => {
    return (
        <div
            className="group flex gap-4 items-center cursor-pointer p-3 hover:bg-background-subdued-hover rounded-[6px]"
            onClick={onClick}
        >
            <Avatar firstName="John" />
            <div className="flex flex-1 items-start flex-col">
                <span className="text-content-primary font-semibold text-[14px]">
                    Personal space
                </span>
                <span className="text-content-secondary dark:group-hover:text-content-primary font-medium text-[12px]">
                    Only you
                </span>
            </div>
            {icon}
        </div>
    )
}

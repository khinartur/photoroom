import {tcn} from '../utils/tcn'

type MenuItemProps = {
    className?: string
    iconClassName?: string
    labelClassName?: string
    label: string | React.ReactNode
    icon?: React.ReactNode
    right?: React.ReactNode
    onClick?: () => void
    active?: boolean
}

export const MenuItem = ({
    className,
    iconClassName,
    labelClassName,
    label,
    icon,
    right,
    active = false,
    onClick,
}: MenuItemProps) => {
    return (
        <div
            className={tcn(
                'group flex items-center justify-between rounded-[10px] p-2.5 cursor-pointer hover:bg-background-subdued-hover',
                {
                    'bg-background-accent-subdued hover:bg-background-accent-subdued':
                        active,
                },
                className,
            )}
            onClick={onClick}
        >
            <div className="flex flex-1 items-center justify-start gap-3">
                {icon && (
                    <div
                        className={tcn(
                            'flex items-center justify-center size-5 text-content-secondary dark:group-hover:text-content-primary',
                            {
                                'text-content-accent dark:group-hover:text-content-accent':
                                    active,
                            },
                            iconClassName,
                        )}
                    >
                        {icon}
                    </div>
                )}
                {typeof label === 'string' ? (
                    <span
                        className={tcn(
                            'text-content-primary text-[14px] font-medium',
                            {
                                'text-content-accent': active,
                            },
                            labelClassName,
                        )}
                    >
                        {label}
                    </span>
                ) : (
                    label
                )}
            </div>
            {right}
        </div>
    )
}

import {tcn} from '../utils/tcn'

type MenuItemProps = {
    label: string
    icon?: React.ReactNode
    onClick?: () => void
    active?: boolean
}

export const MenuItem = ({
    label,
    icon,
    active = false,
    onClick,
}: MenuItemProps) => {
    return (
        <div
            className={tcn(
                'group flex items-center justify-start gap-3 rounded-[10px] p-2.5 cursor-pointer hover:bg-background-subdued-hover',
                {
                    'bg-background-accent-subdued hover:bg-background-accent-subdued':
                        active,
                },
            )}
            onClick={onClick}
        >
            {icon && (
                <div
                    className={tcn(
                        'flex items-center justify-center size-5 text-content-secondary dark:group-hover:text-content-primary',
                        {
                            'text-content-accent dark:group-hover:text-content-accent':
                                active,
                        },
                    )}
                >
                    {icon}
                </div>
            )}
            <span
                className={tcn('text-content-primary text-[14px] font-medium', {
                    'text-content-accent': active,
                })}
            >
                {label}
            </span>
        </div>
    )
}

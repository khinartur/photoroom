import {tcn} from '../utils/tcn'

type MenuItemProps = {
    label: string
    icon: React.ReactNode
    active?: boolean
}

export const MenuItem = ({label, icon, active = false}: MenuItemProps) => {
    return (
        <div
            className={tcn(
                'flex items-center justify-start gap-3 rounded-[10px] p-2.5 cursor-pointer hover:bg-background-subdued-hover',
                {
                    'bg-background-accent-subdued hover:bg-background-accent-subdued':
                        active,
                },
            )}
        >
            <div
                className={tcn(
                    'flex items-center justify-center size-5 text-content-secondary',
                    {'text-content-accent': active},
                )}
            >
                {icon}
            </div>
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

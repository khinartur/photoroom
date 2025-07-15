import {tcn} from '../utils/tcn'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    iconClassName?: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'negative'
    onClick?: () => void
    icon?: React.ReactNode
    disabled?: boolean
}

export const Button = ({
    children,
    onClick,
    className,
    iconClassName,
    variant = 'primary',
    icon,
    disabled,
    ...props
}: ButtonProps) => {
    return (
        <button
            type="button"
            className={tcn(
                className,
                'flex gap-2 items-center justify-center overflow-hidden rounded-[10px] outline-none',
                'h-10 px-4 appearance-none font-medium text-[14px] cursor-pointer',
                {
                    'bg-background-accent text-white': variant === 'primary',
                    'hover:bg-background-accent-hover active:bg-background-accent-down':
                        variant === 'primary' && !disabled,

                    'bg-background-subdued text-content-primary':
                        variant === 'secondary',
                    'bg-transparent text-content-primary': variant === 'ghost',
                    'hover:bg-background-subdued-hover active:bg-background-subdued-down':
                        (variant === 'secondary' || variant === 'ghost') &&
                        !disabled,

                    'bg-background-accent-subdued text-content-accent':
                        variant === 'accent',
                    'hover:bg-background-accent-subdued-hover active:bg-background-accent-subdued-down':
                        variant === 'accent' && !disabled,

                    'bg-negative-alpha-1 text-content-negative':
                        variant === 'negative',
                    'hover:bg-negative-alpha-2 active:bg-negative-alpha-3':
                        variant === 'negative' && !disabled,

                    'opacity-50 cursor-not-allowed': disabled,
                    'w-10 px-0': !children,
                },
            )}
            onClick={disabled ? undefined : onClick}
            {...props}
        >
            {icon && (
                <div
                    className={tcn(
                        'flex items-center justify-center size-5',
                        iconClassName,
                    )}
                >
                    {icon}
                </div>
            )}
            {children}
        </button>
    )
}

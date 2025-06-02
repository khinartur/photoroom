import {tcn} from '../utils/tcn'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    variant?: 'primary' | 'secondary' | 'accent'
    onClick?: () => void
    icon?: React.ReactNode
}

export const Button = ({
    children,
    onClick,
    className,
    variant = 'primary',
    icon,
}: ButtonProps) => {
    return (
        <button
            type="button"
            className={tcn(
                className,
                'flex gap-2 items-center justify-center overflow-hidden rounded-[10px] outline-none',
                'h-10 px-4 appearance-none font-medium text-[14px] cursor-pointer',
                {
                    'bg-background-accent hover:bg-background-accent-hover active:bg-background-accent-down text-white':
                        variant === 'primary',
                    'bg-background-subdued hover:bg-background-subdued-hover active:bg-background-subdued-down  text-content-primary':
                        variant === 'secondary',
                    'bg-background-accent-subdued hover:bg-background-accent-subdued-hover active:bg-background-accent-subdued-down text-content-accent':
                        variant === 'accent',
                    'w-10 px-0': !children,
                },
            )}
            onClick={onClick}
        >
            {icon && (
                <div className="flex items-center justify-center size-5">
                    {icon}
                </div>
            )}
            {children}
        </button>
    )
}

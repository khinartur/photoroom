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
                    'bg-content-accent hover:bg-accent-400 active:bg-accent-600 text-white':
                        variant === 'primary',
                    'bg-background-subdued hover:bg-background-subdued-hover actvie:bg-background-subdued-down  text-black':
                        variant === 'secondary',
                    'bg-accent-alpha-1 hover:bg-accent-alpha-2 active:bg-accent-alpha-3 text-content-accent':
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

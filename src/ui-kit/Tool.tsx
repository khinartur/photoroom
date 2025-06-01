import {tcn} from '../utils/tcn'

type ToolProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: React.ReactNode
    onClick: () => void
}

export const Tool = ({icon, onClick, children}: ToolProps) => {
    return (
        <button
            type="button"
            className={tcn(
                'flex flex-col gap-0.5 items-center justify-center overflow-hidden rounded-[10px] outline-none',
                'h-[54px] w-20 px-2 appearance-none text-xs font-medium cursor-pointer',
                'hover:bg-background-subdued-hover active:bg-background-subdued-hover',
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

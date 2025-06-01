import {tcn} from '../utils/tcn'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
}

export const Input = ({label, ...props}: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    htmlFor={props.id}
                    className="text-content-primary text-sm font-medium"
                >
                    {label}
                </label>
            )}
            <input
                type="text"
                className={tcn(
                    'h-10 w-full px-4 py-2 appearance-none outline-none rounded-[10px]',
                    'bg-white border border-black-alpha-3 hover:border-neutral-4 focus-visible:border-content-accent',
                    'text-black text-sm font-medium',
                )}
                {...props}
            />
        </div>
    )
}

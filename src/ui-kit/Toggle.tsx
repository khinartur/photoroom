import {tcn} from '../utils/tcn'
import * as Switch from '@radix-ui/react-switch'

type ToggleProps = {
    id: string
    className?: string
    label: string
    defaultChecked?: boolean
    onChange: (checked: boolean) => void
}

export const Toggle = ({
    id,
    className,
    label,
    defaultChecked,
    onChange,
}: ToggleProps) => {
    const onCheckedChange = (checked: boolean) => {
        onChange(checked)
    }

    return (
        <div className="flex items-center gap-4">
            <Switch.Root
                id={id}
                className={tcn(
                    className,
                    'w-8 h-5 rounded-full cursor-pointer bg-neutral-4 [&[data-state=checked]]:bg-content-accent focus:outline-none',
                )}
                defaultChecked={defaultChecked}
                onCheckedChange={onCheckedChange}
            >
                <Switch.Thumb
                    className={tcn(
                        'block h-4 w-4 rounded-full bg-content-white-primary translate-x-[2px] [&[data-state=checked]]:translate-x-[14px]',
                        'transition-transform duration-200 ease-in-out',
                    )}
                />
            </Switch.Root>
            <label
                htmlFor={id}
                className="text-sm font-medium text-content-primary"
            >
                {label}
            </label>
        </div>
    )
}

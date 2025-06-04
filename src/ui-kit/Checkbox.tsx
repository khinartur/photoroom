import {CheckIcon} from '../icons'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import {tcn} from '../utils/tcn'

type CheckboxProps = {
    id: string
    checked?: boolean
    defaultChecked?: boolean
    label?: string
    onChange?: (checked: boolean) => void
}

export const Checkbox = ({
    id,
    label,
    defaultChecked,
    checked,
    onChange,
}: CheckboxProps) => {
    return (
        <div className="flex items-center gap-2">
            <RadixCheckbox.Root
                id={id}
                className={tcn(
                    'flex items-center justify-center size-4 bg-transparent border-[2px] border-content-secondary rounded-sm',
                    'focus:outline-none cursor-pointer',
                    {
                        'bg-content-accent border-content-accent': checked,
                    },
                )}
                checked={checked}
                onCheckedChange={onChange}
                defaultChecked={defaultChecked}
            >
                <RadixCheckbox.Indicator className="flex size-4 text-white">
                    <CheckIcon />
                </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
            {label && (
                <label
                    className="text-sm font-medium text-content-primary"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
        </div>
    )
}

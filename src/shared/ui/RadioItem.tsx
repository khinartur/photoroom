import {CheckIcon} from '../icons'
import * as RadioGroup from '@radix-ui/react-radio-group'
import {tcn} from '../utils/tcn'

export const RadioItem = (props: RadioGroup.RadioGroupItemProps) => {
    return (
        <RadioGroup.Item
            className={tcn(
                'flex items-center justify-center size-6 rounded-full border-[2px] border-neutral-4 cursor-pointer',
                'data-[state=checked]:border-none data-[state=checked]:bg-content-accent',
            )}
            {...props}
        >
            <RadioGroup.Indicator className="flex items-center justify-center size-5 text-white">
                <CheckIcon />
            </RadioGroup.Indicator>
        </RadioGroup.Item>
    )
}

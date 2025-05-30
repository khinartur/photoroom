import cn from 'classnames'
import {twMerge} from 'tailwind-merge'

export const tcn = (...classnames: cn.ArgumentArray) => {
    return twMerge(cn(classnames))
}

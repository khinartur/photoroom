import {TrashIcon} from '../icons'
import {MenuItem} from './MenuItem'

type DeleteMenuItemProps = {
    onClick?: () => void
}

export const DeleteMenuItem = ({onClick}: DeleteMenuItemProps) => {
    return (
        <MenuItem
            className="rounded-[6px]"
            iconClassName="text-content-negative dark:group-hover:text-content-negative"
            labelClassName="text-content-negative"
            label="Delete"
            icon={<TrashIcon />}
            onClick={onClick}
        />
    )
}

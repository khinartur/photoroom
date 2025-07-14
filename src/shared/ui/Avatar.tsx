import {tcn} from '../utils/tcn'

type AvatarProps = {
    firstName: string
}

export const Avatar = ({firstName}: AvatarProps) => {
    return (
        <div
            className={tcn(
                'size-10 flex items-center justify-center rounded-full text-content-white-primary-inverted',
                'bg-accent-300',
            )}
        >
            <span className="text-[20px] font-semibold">{firstName[0]}</span>
        </div>
    )
}

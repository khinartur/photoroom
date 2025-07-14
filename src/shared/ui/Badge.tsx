import {tcn} from '../utils/tcn'
import {VerifiedIcon} from '../icons'

export const Badge = () => {
    return (
        <div
            className={tcn(
                'size-6 flex items-center justify-center rounded-full text-content-inverted',
                'bg-content-accent',
            )}
        >
            <VerifiedIcon />
        </div>
    )
}

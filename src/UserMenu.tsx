import {observer} from 'mobx-react-lite'
import {useAppState} from './providers/root'
import {tcn} from './utils/tcn'
import {ExpandIcon} from './icons'
import {User} from './User'
import {Dropdown} from './ui-kit/Dropdown'
import {Badge} from './ui-kit/Badge'

export const UserMenu = observer(() => {
    const appState = useAppState()

    return (
        <Dropdown
            align="start"
            trigger={
                <User
                    icon={
                        <div className="flex items-center justify-center size-5 text-content-primary">
                            <ExpandIcon />
                        </div>
                    }
                />
            }
            content={
                <div
                    className={tcn(
                        'w-[320px] bg-background-primary outline-none p-1',
                        'border border-misc-border rounded-[10px]',
                    )}
                >
                    <User
                        onClick={() => appState.goToDesignsPage()}
                        icon={<Badge />}
                    />
                </div>
            }
        />
    )
})

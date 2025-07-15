import {observer} from 'mobx-react-lite'
import {ExpandIcon} from '~/shared/icons'
import {tcn} from '~/shared/utils'
import {useAppState} from '~/shared/state'
import {Dropdown, Badge} from '~/shared/ui'
import {User} from '~/widgets/user'

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

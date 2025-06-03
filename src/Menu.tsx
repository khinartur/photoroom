import {observer} from 'mobx-react-lite'
import {CreateIcon, SettingsIcon, StackIcon} from './icons'
import {MenuItem} from './ui-kit/MenuItem'
import {UserMenu} from './UserMenu'
import {useAppState} from './providers/app'
import {useModalsState} from './providers/modals'

export const Menu = observer(() => {
    const appState = useAppState()
    const modalsState = useModalsState()

    if (appState.image !== null) {
        return null
    }

    return (
        <div className="flex h-full flex-col gap-4 p-4 w-[280px] overflow-y-auto border-r border-black-alpha-1">
            <UserMenu />
            <div className="flex flex-1 flex-col gap-4">
                <MenuItem
                    label="Create"
                    icon={<CreateIcon />}
                    onClick={() => appState.goToCreatePage()}
                    active={appState.page === 'CREATE'}
                />
                <div className="flex flex-col flex-1">
                    <div className="p-3">
                        <span className="text-content-tertiary text-[14px] font-medium">
                            Your Content
                        </span>
                    </div>
                    <MenuItem
                        label="Designs"
                        icon={<StackIcon />}
                        onClick={() => appState.goToDesignsPage()}
                        active={appState.page === 'DESIGNS'}
                    />
                </div>
                <MenuItem
                    label="Preferences"
                    icon={<SettingsIcon />}
                    onClick={() => modalsState.openSettingsModal()}
                />
            </div>
        </div>
    )
})

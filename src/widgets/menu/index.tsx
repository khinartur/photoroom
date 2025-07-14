import {observer} from 'mobx-react-lite'
import {CreateIcon, SettingsIcon, StackIcon} from '~/shared/icons'
import {useAppState, useModalsState} from '~/shared/state'
import {MenuItem} from '~/shared/ui'
import {UserMenu} from '~/widgets/user-menu'

export const Menu = observer(() => {
    const appState = useAppState()
    const modalsState = useModalsState()

    if (appState.page.type === 'EDITOR') {
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
                    active={appState.page.type === 'CREATE'}
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
                        active={appState.page.type === 'DESIGNS'}
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

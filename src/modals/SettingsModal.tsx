import {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {Modal} from '../ui-kit/Modal'
import {AppStateContext} from '../state/app'
import {ModalsStateContext} from '../state/modals'
import type {CommonModalProps} from '.'
import {MenuItem} from '../ui-kit/MenuItem'
import {Toggle} from '../ui-kit/Toggle'

export const SettingsModal = observer(({mountNode}: CommonModalProps) => {
    const appState = useContext(AppStateContext)
    const modalsState = useContext(ModalsStateContext)

    return (
        <Modal
            className="h-full max-h-[calc(100vh-128px)] w-full max-w-[1400px]"
            mountNode={mountNode}
            onClose={() => modalsState.closeModal()}
        >
            <div className="flex flex-1 h-full">
                <div className="h-full w-[280px] flex flex-col gap-4 px-6 py-4 border-r border-r-misc-divider">
                    <MenuItem label="Preferences" active />
                </div>
                <div className="flex flex-1 flex-col gap-6 bg-background-modal px-16 py-10 pb-16">
                    <span className="text-xl font-bold text-content-primary">
                        Appearance
                    </span>
                    <div className="flex flex-col gap-4 bg-background-primary rounded-[10px] px-6 py-5">
                        <Toggle
                            id="dark-mode"
                            label="Dark mode"
                            defaultChecked={appState.theme === 'DARK'}
                            onChange={checked => {
                                appState.setTheme(checked ? 'DARK' : 'LIGHT')
                            }}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
})

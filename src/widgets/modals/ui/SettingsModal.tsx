import {observer} from 'mobx-react-lite'
import {useAppState, useModalsState} from '~/shared/state'
import {Modal} from '~/shared/ui'
import {MenuItem, Toggle} from '~/shared/ui'
import type {CommonModalProps} from '../types'

export const SettingsModal = observer(({mountNode}: CommonModalProps) => {
    const appState = useAppState()
    const modalsState = useModalsState()

    return (
        <Modal
            className="h-full max-h-[calc(100vh-128px)] w-full max-w-[1400px]"
            mountNode={mountNode}
            showCloseButton
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

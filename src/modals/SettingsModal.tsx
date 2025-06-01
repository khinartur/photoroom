import {observer} from 'mobx-react-lite'
import {Modal} from '../ui-kit/Modal'
import {useContext} from 'react'
import {ModalsStateContext} from '../state/modals'
import type {CommonModalProps} from '.'
import {MenuItem} from '../ui-kit/MenuItem'

export const SettingsModal = observer(({mountNode}: CommonModalProps) => {
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
                <div className="h-full flex-1 bg-[#f7f7fa]">Settings</div>
            </div>
        </Modal>
    )
})

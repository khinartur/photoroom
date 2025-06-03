import {observer} from 'mobx-react-lite'
import {useModalsState} from './providers/modals'
import {NewFolderModal} from './modals/NewFolderModal'
import {SettingsModal} from './modals/SettingsModal'

export const Modals = observer(() => {
    const modalsState = useModalsState()
    const mountNode = document.getElementById('root')

    if (modalsState.openModal === 'NEW_FOLDER') {
        return <NewFolderModal mountNode={mountNode} />
    }

    if (modalsState.openModal === 'SETTINGS') {
        return <SettingsModal mountNode={mountNode} />
    }

    return null
})

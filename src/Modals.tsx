import {observer} from 'mobx-react-lite'
import {useContext} from 'react'
import {ModalsStateContext} from './state/modals'
import {NewFolderModal} from './modals/NewFolderModal'
import {SettingsModal} from './modals/SettingsModal'

export const Modals = observer(() => {
    const modalsState = useContext(ModalsStateContext)
    const mountNode = document.getElementById('root')

    if (modalsState.openModal === 'NEW_FOLDER') {
        return <NewFolderModal mountNode={mountNode} />
    }

    if (modalsState.openModal === 'SETTINGS') {
        return <SettingsModal mountNode={mountNode} />
    }

    return null
})

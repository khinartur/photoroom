import {observer} from 'mobx-react-lite'
import {useModalsState} from './providers/root'
import {NewFolderModal} from './modals/NewFolderModal'
import {SettingsModal} from './modals/SettingsModal'
import {DeleteDesignModal} from './modals/DeleteDesignModal'
import {DeleteFolderModal} from './modals/DeleteFolderModal'

export const Modals = observer(() => {
    const modalsState = useModalsState()
    const mountNode = document.getElementById('root')

    if (!modalsState.openModal) {
        return null
    }

    if (modalsState.openModal.type === 'NEW_FOLDER') {
        return <NewFolderModal mountNode={mountNode} />
    }

    if (modalsState.openModal.type === 'SETTINGS') {
        return <SettingsModal mountNode={mountNode} />
    }

    if (modalsState.openModal.type === 'DELETE_DESIGN') {
        return (
            <DeleteDesignModal
                mountNode={mountNode}
                designId={modalsState.openModal.designId}
            />
        )
    }

    if (modalsState.openModal.type === 'DELETE_FOLDER') {
        return (
            <DeleteFolderModal
                mountNode={mountNode}
                folderId={modalsState.openModal.folderId}
            />
        )
    }

    return null
})

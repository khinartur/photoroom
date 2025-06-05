import {observer} from 'mobx-react-lite'
import {useModalsState} from './providers/root'
import {NewFolderModal} from './modals/NewFolderModal'
import {SettingsModal} from './modals/SettingsModal'
import {DeleteDesignsModal} from './modals/DeleteDesignsModal'
import {DeleteFolderModal} from './modals/DeleteFolderModal'
import {AddToFolderModal} from './modals/AddToFolderModal'

export const Modals = observer(() => {
    const modalsState = useModalsState()
    const mountNode = document.getElementById('root')

    if (!modalsState.openModal) {
        return null
    }

    if (modalsState.openModal.type === 'NEW_FOLDER') {
        return (
            <NewFolderModal
                mountNode={mountNode}
                addSelectionOnSuccess={
                    modalsState.openModal.addSelectionOnSuccess
                }
            />
        )
    }

    if (modalsState.openModal.type === 'SETTINGS') {
        return <SettingsModal mountNode={mountNode} />
    }

    if (modalsState.openModal.type === 'ADD_TO_FOLDER') {
        return <AddToFolderModal mountNode={mountNode} />
    }

    if (modalsState.openModal.type === 'DELETE_DESIGN') {
        return (
            <DeleteDesignsModal
                mountNode={mountNode}
                designsIds={modalsState.openModal.designsIds}
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

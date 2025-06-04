import {observer} from 'mobx-react-lite'
import {useAppState} from './providers/root'
import {DesignsPage} from './pages/Designs'
import {CreatePage} from './pages/Create'
import {EditorPage} from './pages/Editor'
import {FolderPage} from './pages/Folder'

export const Content = observer(() => {
    const appState = useAppState()

    if (appState.page.type === 'EDITOR') {
        return <EditorPage />
    }

    if (appState.page.type === 'DESIGNS') {
        return <DesignsPage />
    }

    if (appState.page.type === 'FOLDER') {
        return <FolderPage />
    }

    if (appState.page.type === 'CREATE') {
        return <CreatePage />
    }

    return null
})

import {observer} from 'mobx-react-lite'
import {useAppState} from '~/shared/state'
import {CreatePage, DesignsPage, EditorPage, FolderPage} from '~/pages/index'

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

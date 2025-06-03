import {observer} from 'mobx-react-lite'
import {useAppState} from './providers/app'
import {DesignsPage} from './pages/Designs'
import {CreatePage} from './pages/Create'
import {EditorPage} from './pages/Editor'

export const Content = observer(() => {
    const appState = useAppState()

    if (appState.image !== null) {
        return <EditorPage />
    }

    if (appState.page === 'DESIGNS') {
        return <DesignsPage />
    }

    if (appState.page === 'CREATE') {
        return <CreatePage />
    }

    return null
})

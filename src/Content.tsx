import {observer} from 'mobx-react-lite'
import {useContext} from 'react'
import {AppStateContext} from './state/app'
import {DesignsPage} from './pages/Designs'
import {CreatePage} from './pages/Create'

export const Content = observer(() => {
    const appState = useContext(AppStateContext)

    if (appState.page === 'DESIGNS') {
        return <DesignsPage />
    }

    if (appState.page === 'CREATE') {
        return <CreatePage />
    }

    return null
})

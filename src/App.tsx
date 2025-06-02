import {useContext, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {AppStateContext} from './state/app'
import {Menu} from './Menu'
import {Content} from './Content'

export const App = observer(() => {
    const appState = useContext(AppStateContext)

    useEffect(() => {
        document.documentElement.classList.toggle(
            'dark',
            appState.theme === 'DARK',
        )
    }, [appState.theme])

    return (
        <div className="flex h-full bg-background-primary">
            <Menu />
            <Content />
        </div>
    )
})

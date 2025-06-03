import {useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {useAppState} from './providers/app'
import {Menu} from './Menu'
import {Content} from './Content'

export const App = observer(() => {
    const appState = useAppState()

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

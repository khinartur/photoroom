import {useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {useAppState} from './providers/root'
import {Menu} from './Menu'
import {Content} from './Content'
import {SelectionBar} from './SelectionBar'

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
            <SelectionBar />
        </div>
    )
})

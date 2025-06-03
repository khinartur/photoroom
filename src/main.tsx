import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App'
import {Modals} from './Modals'
import {RootStateProvider} from './providers/root'
import {initDB} from './utils/idb'

const renderApp = async () => {
    const db = await initDB()

    // biome-ignore lint/style/noNonNullAssertion: root is always defined
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <RootStateProvider db={db}>
                <App />
                <Modals />
            </RootStateProvider>
        </StrictMode>,
    )
}

renderApp()

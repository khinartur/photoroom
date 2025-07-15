import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/index.css'

import {App} from './App'
import {RootStateProvider} from '~/shared/state'
import {initDB} from '~/shared/utils'
import {Modals} from '~/widgets/modals'
import {ToastProvider} from './providers'

const renderApp = async () => {
    const db = await initDB()

    // biome-ignore lint/style/noNonNullAssertion: root is always defined
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <RootStateProvider db={db}>
                <ToastProvider>
                    <App />
                    <Modals />
                </ToastProvider>
            </RootStateProvider>
        </StrictMode>,
    )
}

renderApp()

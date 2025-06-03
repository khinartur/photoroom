import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App'
import {Modals} from './Modals'
import {AppStateProvider} from './providers/app'
import {FoldersStateProvider} from './providers/folders'
import {ModalsStateProvider} from './providers/modals'
import {EditorStateProvider} from './providers/editor'
import {initDB} from './utils/idb'

const renderApp = async () => {
    const db = await initDB()

    // biome-ignore lint/style/noNonNullAssertion: root is always defined
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <ModalsStateProvider>
                <AppStateProvider db={db}>
                    <EditorStateProvider db={db}>
                        <FoldersStateProvider db={db}>
                            <App />
                            <Modals />
                        </FoldersStateProvider>
                    </EditorStateProvider>
                </AppStateProvider>
            </ModalsStateProvider>
        </StrictMode>,
    )
}

renderApp()

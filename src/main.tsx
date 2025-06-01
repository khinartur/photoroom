import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App'
import {Modals} from './Modals'
import {AppState, AppStateContext} from './state/app'
import {ModalsState} from './state/modals'
import {ModalsStateContext} from './state/modals'
import {EditorState} from './state/editor'
import {EditorStateContext} from './state/editor'

// biome-ignore lint/style/noNonNullAssertion: root is always defined
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ModalsStateContext.Provider value={new ModalsState()}>
            <AppStateContext.Provider value={new AppState()}>
                <EditorStateContext.Provider value={new EditorState()}>
                    <App />
                    <Modals />
                </EditorStateContext.Provider>
            </AppStateContext.Provider>
        </ModalsStateContext.Provider>
    </StrictMode>,
)

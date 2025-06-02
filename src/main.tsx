import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App'
import {Modals} from './Modals'
import {AppState, AppStateContext} from './state/app'
import {ModalsState, ModalsStateContext} from './state/modals'
import {EditorState, EditorStateContext} from './state/editor'
import {FoldersState, FoldersStateContext} from './state/folders'

// biome-ignore lint/style/noNonNullAssertion: root is always defined
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ModalsStateContext.Provider value={new ModalsState()}>
            <AppStateContext.Provider value={new AppState()}>
                <EditorStateContext.Provider value={new EditorState()}>
                    <FoldersStateContext.Provider value={new FoldersState()}>
                        <App />
                        <Modals />
                    </FoldersStateContext.Provider>
                </EditorStateContext.Provider>
            </AppStateContext.Provider>
        </ModalsStateContext.Provider>
    </StrictMode>,
)

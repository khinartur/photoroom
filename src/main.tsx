import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App'
import {AppState, AppStateContext} from './state/app'
import {Modals} from './Modals'
import {ModalsState} from './state/modals'
import {ModalsStateContext} from './state/modals'

// biome-ignore lint/style/noNonNullAssertion: root is always defined
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ModalsStateContext.Provider value={new ModalsState()}>
            <AppStateContext.Provider value={new AppState()}>
                <App />
                <Modals />
            </AppStateContext.Provider>
        </ModalsStateContext.Provider>
    </StrictMode>,
)

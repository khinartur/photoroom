import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App'
import {AppState, AppStateContext} from './state/app'

// biome-ignore lint/style/noNonNullAssertion: root is always defined
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppStateContext.Provider value={new AppState()}>
            <App />
        </AppStateContext.Provider>
    </StrictMode>,
)

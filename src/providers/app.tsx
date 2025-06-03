import type {Context} from 'react'
import {createContext, useContext} from 'react'
import type {IDBPDatabase} from 'idb'
import type {PhotoroomDBSchema} from '../utils/idb'
import {AppState} from '../state/app'

function createAppStateProvider() {
    let AppStateContext: Context<AppState>

    const AppStateProvider: React.FC<{
        children: React.ReactNode
        db: IDBPDatabase<PhotoroomDBSchema>
    }> = ({children, db}) => {
        const value = new AppState(db)

        if (!AppStateContext) {
            AppStateContext = createContext(value)
            AppStateContext.displayName = 'AppStateContext'
        }

        return (
            <AppStateContext.Provider value={value}>
                {children}
            </AppStateContext.Provider>
        )
    }

    return {
        getAppStateContext: () => AppStateContext,
        AppStateProvider,
    }
}

function createAppStateHook(getContext: () => Context<AppState>) {
    return () => useContext(getContext())
}

export const {AppStateProvider, getAppStateContext} = createAppStateProvider()

export const useAppState = createAppStateHook(getAppStateContext)

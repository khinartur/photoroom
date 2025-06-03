import type {Context} from 'react'
import {createContext, useContext} from 'react'
import {ModalsState} from '../state/modals'

function createModalsStateProvider() {
    let ModalsStateContext: Context<ModalsState>

    const ModalsStateProvider: React.FC<{
        children: React.ReactNode
    }> = ({children}) => {
        const value = new ModalsState()

        if (!ModalsStateContext) {
            ModalsStateContext = createContext(value)
            ModalsStateContext.displayName = 'ModalsStateContext'
        }

        return (
            <ModalsStateContext.Provider value={value}>
                {children}
            </ModalsStateContext.Provider>
        )
    }

    return {
        getModalsStateContext: () => ModalsStateContext,
        ModalsStateProvider,
    }
}

function createModalsStateHook(getContext: () => Context<ModalsState>) {
    return () => useContext(getContext())
}

export const {ModalsStateProvider, getModalsStateContext} =
    createModalsStateProvider()

export const useModalsState = createModalsStateHook(getModalsStateContext)

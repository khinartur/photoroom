import type {Context} from 'react'
import {createContext, useContext} from 'react'
import type {IDBPDatabase} from 'idb'
import type {PhotoroomDBSchema} from '../utils/idb'
import {RootState} from '../state/root'

function createRootStateProvider() {
    let RootStateContext: Context<RootState>

    const RootStateProvider: React.FC<{
        children: React.ReactNode
        db: IDBPDatabase<PhotoroomDBSchema>
    }> = ({children, db}) => {
        const value = new RootState(db)

        if (!RootStateContext) {
            RootStateContext = createContext(value)
            RootStateContext.displayName = 'RootStateContext'
        }

        return (
            <RootStateContext.Provider value={value}>
                {children}
            </RootStateContext.Provider>
        )
    }

    return {
        getRootStateContext: () => RootStateContext,
        RootStateProvider,
    }
}

function createRootStateHook(getContext: () => Context<RootState>) {
    return () => useContext(getContext())
}

function createAppStateHook(getContext: () => Context<RootState>) {
    return () => {
        const rootState = useContext(getContext())
        return rootState.appState
    }
}

function createModalsStateHook(getContext: () => Context<RootState>) {
    return () => {
        const rootState = useContext(getContext())
        return rootState.modalsState
    }
}

function createEditorStateHook(getContext: () => Context<RootState>) {
    return () => {
        const rootState = useContext(getContext())
        return rootState.editorState
    }
}

function createFoldersStateHook(getContext: () => Context<RootState>) {
    return () => {
        const rootState = useContext(getContext())
        return rootState.foldersState
    }
}

function createDesignsStateHook(getContext: () => Context<RootState>) {
    return () => {
        const rootState = useContext(getContext())
        return rootState.designsState
    }
}

export const {RootStateProvider, getRootStateContext} =
    createRootStateProvider()

export const useRootState = createRootStateHook(getRootStateContext)
export const useAppState = createAppStateHook(getRootStateContext)
export const useModalsState = createModalsStateHook(getRootStateContext)
export const useEditorState = createEditorStateHook(getRootStateContext)
export const useDesignsState = createDesignsStateHook(getRootStateContext)
export const useFoldersState = createFoldersStateHook(getRootStateContext)

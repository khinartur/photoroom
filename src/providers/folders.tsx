import type {Context} from 'react'
import {createContext, useContext} from 'react'
import type {IDBPDatabase} from 'idb'
import type {PhotoroomDBSchema} from '../utils/idb'
import {FoldersState} from '../state/folders'

function createFoldersStateProvider() {
    let FoldersStateContext: Context<FoldersState>

    const FoldersStateProvider: React.FC<{
        children: React.ReactNode
        db: IDBPDatabase<PhotoroomDBSchema>
    }> = ({children, db}) => {
        const value = new FoldersState(db)

        if (!FoldersStateContext) {
            FoldersStateContext = createContext(value)
            FoldersStateContext.displayName = 'FoldersStateContext'
        }

        return (
            <FoldersStateContext.Provider value={value}>
                {children}
            </FoldersStateContext.Provider>
        )
    }

    return {
        getFoldersStateContext: () => FoldersStateContext,
        FoldersStateProvider,
    }
}

function createFoldersStateHook(getContext: () => Context<FoldersState>) {
    return () => useContext(getContext())
}

export const {FoldersStateProvider, getFoldersStateContext} =
    createFoldersStateProvider()

export const useFoldersState = createFoldersStateHook(getFoldersStateContext)

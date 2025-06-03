import type {Context} from 'react'
import {createContext, useContext} from 'react'
import type {IDBPDatabase} from 'idb'
import type {PhotoroomDBSchema} from '../utils/idb'
import {EditorState} from '../state/editor'

function createEditorStateProvider() {
    let EditorStateContext: Context<EditorState>

    const EditorStateProvider: React.FC<{
        children: React.ReactNode
        db: IDBPDatabase<PhotoroomDBSchema>
    }> = ({children, db}) => {
        const value = new EditorState(db)

        if (!EditorStateContext) {
            EditorStateContext = createContext(value)
            EditorStateContext.displayName = 'EditorStateContext'
        }

        return (
            <EditorStateContext.Provider value={value}>
                {children}
            </EditorStateContext.Provider>
        )
    }

    return {
        getEditorStateContext: () => EditorStateContext,
        EditorStateProvider,
    }
}

function createEditorStateHook(getContext: () => Context<EditorState>) {
    return () => useContext(getContext())
}

export const {EditorStateProvider, getEditorStateContext} =
    createEditorStateProvider()

export const useEditorState = createEditorStateHook(getEditorStateContext)

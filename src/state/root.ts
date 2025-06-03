import type {IDBPDatabase} from 'idb'
import type {PhotoroomDBSchema} from '../utils/idb'
import {AppState} from './app'
import {FoldersState} from './folders'
import {DesignsState} from './designs'
import {EditorState} from './editor'
import {ModalsState} from './modals'

export class RootState {
    appState: AppState
    foldersState: FoldersState
    designsState: DesignsState
    editorState: EditorState
    modalsState: ModalsState

    constructor(db: IDBPDatabase<PhotoroomDBSchema>) {
        this.appState = new AppState(this, db)
        this.foldersState = new FoldersState(this, db)
        this.designsState = new DesignsState(this, db)
        this.editorState = new EditorState(this, db)
        this.modalsState = new ModalsState(this)
    }
}

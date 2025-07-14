import type {IDBPDatabase} from 'idb'
import type {PhotoroomDBSchema} from '../utils/idb'
import {AppState} from './app'
import {FoldersState} from './folders'
import {DesignsState} from './designs'
import {EditorState} from './editor'
import {ModalsState} from './modals'
import {SelectionState} from './selection'
import {ToastState} from './toast'
import {HistoryState} from './history'

export class RootState {
    appState: AppState
    foldersState: FoldersState
    designsState: DesignsState
    editorState: EditorState
    modalsState: ModalsState
    selectionState: SelectionState
    toastState: ToastState
    historyState: HistoryState

    constructor(db: IDBPDatabase<PhotoroomDBSchema>) {
        this.appState = new AppState(this, db)
        this.foldersState = new FoldersState(this, db)
        this.designsState = new DesignsState(this, db)
        this.editorState = new EditorState(this, db)
        this.modalsState = new ModalsState(this)
        this.selectionState = new SelectionState(this)
        this.toastState = new ToastState(this)
        this.historyState = new HistoryState(this)
    }
}

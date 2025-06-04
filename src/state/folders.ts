import type {IDBPDatabase} from 'idb'
import type {RootState} from './root'
import type {Design} from './designs'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'
import type {PhotoroomDBSchema} from '../utils/idb'
import {loadFoldersFromDB, saveFoldersToDB} from '../utils/idb'

export type Folder = {
    id: string
    name: string
    designsIds: Design['id'][]
}

export class FoldersState {
    rootState: RootState
    db: IDBPDatabase<PhotoroomDBSchema>

    folders: Folder[] = []

    constructor(rootState: RootState, db: IDBPDatabase<PhotoroomDBSchema>) {
        makeAutoObservable(this)
        this.rootState = rootState
        this.db = db
        this.init()

        reaction(
            () => ({
                folders: this.folders,
                designIds: this.folders.map(folder => folder.designsIds),
            }),
            newVal => {
                const plainFolders = toJS(newVal.folders)
                saveFoldersToDB(this.db, plainFolders)
            },
        )
    }

    async init() {
        const storedFolders = await loadFoldersFromDB(this.db)
        runInAction(() => {
            this.folders = storedFolders ?? []
        })
    }

    addFolder(folder: Folder) {
        this.folders = [...this.folders, folder]
    }

    deleteFolder(id: string) {
        this.folders = this.folders.filter(f => f.id !== id)
        this.rootState.appState.goToDesignsPage()
    }

    get activeFolder() {
        const id =
            this.rootState.appState.page.type === 'FOLDER'
                ? this.rootState.appState.page.folderId
                : null
        if (!id) {
            return null
        }
        return this.folders.find(d => d.id === id)
    }

    addSelectedDesignsToFolder() {
        const folder = this.rootState.selectionState.selectionFolder
        if (!folder) {
            return
        }
        folder.designsIds = this.rootState.selectionState.selection
        this.rootState.appState.goToFolderPage(folder.id)
    }
}

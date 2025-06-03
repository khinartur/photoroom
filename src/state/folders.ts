import type {IDBPDatabase} from 'idb'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'
import type {PhotoroomDBSchema} from '../utils/idb'
import {loadFoldersFromDB, saveFoldersToDB} from '../utils/idb'

export type Folder = {
    id: string
    name: string
}

export class FoldersState {
    db: IDBPDatabase<PhotoroomDBSchema>

    folders: Folder[] = []

    constructor(db: IDBPDatabase<PhotoroomDBSchema>) {
        makeAutoObservable(this)
        this.db = db
        this.init()

        reaction(
            () => this.folders,
            newVal => {
                const plainFolders = toJS(newVal)
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
}

import type {RootState} from './root'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'
import type {IDBPDatabase} from 'idb'
import {
    loadThemeFromDB,
    saveThemeToDB,
    type PhotoroomDBSchema,
} from '../utils/idb'

type DesignsPage = {
    type: 'DESIGNS'
}

type CreatePage = {
    type: 'CREATE'
}

type FolderPage = {
    type: 'FOLDER'
    folderId: string
}

type EditorPage = {
    type: 'EDITOR'
    designId: string
}

type AppPage = DesignsPage | CreatePage | FolderPage | EditorPage
export type AppTheme = 'LIGHT' | 'DARK'

export class AppState {
    rootState: RootState
    db: IDBPDatabase<PhotoroomDBSchema>

    page: AppPage = {type: 'DESIGNS'}
    theme: AppTheme = 'LIGHT'

    constructor(rootState: RootState, db: IDBPDatabase<PhotoroomDBSchema>) {
        makeAutoObservable(this)
        this.rootState = rootState
        this.db = db
        this.init()

        reaction(
            () => this.theme,
            newVal => {
                const theme = toJS(newVal)
                saveThemeToDB(this.db, theme)
            },
        )
    }

    async init() {
        const storedTheme = await loadThemeFromDB(this.db)
        runInAction(() => {
            this.theme = storedTheme ?? 'LIGHT'
        })
    }

    setTheme(theme: AppTheme) {
        this.theme = theme
    }

    goToDesignsPage() {
        this.page = {type: 'DESIGNS'}
    }

    goToCreatePage() {
        this.page = {type: 'CREATE'}
    }

    goToFolderPage(folderId: string) {
        this.page = {type: 'FOLDER', folderId}
    }

    goToEditorPage(designId: string) {
        this.page = {type: 'EDITOR', designId}
    }
}

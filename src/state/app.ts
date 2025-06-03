import type {RootState} from './root'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'
import type {IDBPDatabase} from 'idb'
import {
    loadThemeFromDB,
    saveThemeToDB,
    type PhotoroomDBSchema,
} from '../utils/idb'

type AppPage = 'DESIGNS' | 'CREATE'
export type AppTheme = 'LIGHT' | 'DARK'

export class AppState {
    rootState: RootState
    db: IDBPDatabase<PhotoroomDBSchema>

    page: AppPage = 'DESIGNS'
    theme: AppTheme = 'LIGHT'
    activeDesignId: string | null = null

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

    setActiveDesignId(designId: string | null) {
        this.activeDesignId = designId
    }

    setTheme(theme: AppTheme) {
        this.theme = theme
    }

    goToDesignsPage() {
        this.page = 'DESIGNS'
    }

    goToCreatePage() {
        this.page = 'CREATE'
    }
}

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
    db: IDBPDatabase<PhotoroomDBSchema>

    page: AppPage = 'DESIGNS'
    theme: AppTheme = 'LIGHT'
    // @todo: make setter and set page to EDITOR
    image: HTMLImageElement | null = null

    constructor(db: IDBPDatabase<PhotoroomDBSchema>) {
        makeAutoObservable(this)
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
        this.page = 'DESIGNS'
    }

    goToCreatePage() {
        this.page = 'CREATE'
    }
}

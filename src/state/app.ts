import {makeAutoObservable} from 'mobx'
import {createContext} from 'react'

type AppPage = 'DESIGNS' | 'CREATE'
type AppTheme = 'LIGHT' | 'DARK'

export class AppState {
    page: AppPage = 'DESIGNS'
    theme: AppTheme = 'LIGHT'
    // @todo: make setter and set page to EDITOR
    image: HTMLImageElement | null = null

    constructor() {
        makeAutoObservable(this)
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

export const AppStateContext = createContext<AppState>(new AppState())

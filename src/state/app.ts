import {makeAutoObservable} from 'mobx'
import {createContext} from 'react'

type AppPage = 'DESIGNS' | 'CREATE'

export class AppState {
    page: AppPage = 'DESIGNS'
    // @todo: make setter and set page to EDITOR
    image: HTMLImageElement | null = null

    constructor() {
        makeAutoObservable(this)
    }

    goToDesignsPage() {
        this.page = 'DESIGNS'
    }

    goToCreatePage() {
        this.page = 'CREATE'
    }
}

export const AppStateContext = createContext<AppState>(new AppState())

import {makeAutoObservable} from 'mobx'
import {createContext} from 'react'

type AppPage = 'DESIGNS' | 'CREATE'

export class AppState {
    page: AppPage = 'DESIGNS'

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

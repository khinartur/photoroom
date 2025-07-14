import type {RootState} from './root'
import {makeAutoObservable} from 'mobx'

export type Toast = {
    description: React.ReactNode
}

export class ToastState {
    rootState: RootState

    activeToast: Toast | null = null

    constructor(rootState: RootState) {
        makeAutoObservable(this)
        this.rootState = rootState
    }

    setActiveToast(toast: Toast | null) {
        this.activeToast = toast
    }
}

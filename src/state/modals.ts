import {makeAutoObservable} from 'mobx'
import type {RootState} from './root'

type ModalType = 'NEW_FOLDER' | 'SETTINGS'

export class ModalsState {
    rootState: RootState
    openModal: ModalType | null = null

    constructor(rootState: RootState) {
        makeAutoObservable(this)
        this.rootState = rootState
    }

    openNewFolderModal() {
        this.openModal = 'NEW_FOLDER'
    }

    openSettingsModal() {
        this.openModal = 'SETTINGS'
    }

    closeModal() {
        this.openModal = null
    }
}

import {makeAutoObservable} from 'mobx'

type ModalType = 'NEW_FOLDER' | 'SETTINGS'

export class ModalsState {
    openModal: ModalType | null = null

    constructor() {
        makeAutoObservable(this)
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

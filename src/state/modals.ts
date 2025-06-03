import {makeAutoObservable} from 'mobx'
import type {RootState} from './root'

type NewFolderModal = {type: 'NEW_FOLDER'}
type SettingsModal = {type: 'SETTINGS'}
type DeleteDesignModal = {type: 'DELETE_DESIGN'; designId: string}

type ModalType = NewFolderModal | SettingsModal | DeleteDesignModal

export class ModalsState {
    rootState: RootState
    openModal: ModalType | null = null

    constructor(rootState: RootState) {
        makeAutoObservable(this)
        this.rootState = rootState
    }

    openNewFolderModal() {
        this.openModal = {type: 'NEW_FOLDER'}
    }

    openSettingsModal() {
        this.openModal = {type: 'SETTINGS'}
    }

    openDeleteDesignModal(designId: string) {
        this.openModal = {
            type: 'DELETE_DESIGN',
            designId,
        }
    }

    closeModal() {
        this.openModal = null
    }
}

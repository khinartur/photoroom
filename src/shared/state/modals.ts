import {makeAutoObservable} from 'mobx'
import type {RootState} from './root'
import type {Design} from '../types'
import type {Folder} from './folders'

type NewFolderModal = {type: 'NEW_FOLDER'; addSelectionOnSuccess?: boolean}
type SettingsModal = {type: 'SETTINGS'}
type AddToFolderModal = {type: 'ADD_TO_FOLDER'}
type DeleteDesignModal = {type: 'DELETE_DESIGN'; designsIds: Design['id'][]}
type DeleteFolderModal = {type: 'DELETE_FOLDER'; folderId: Folder['id']}

type ModalType =
    | NewFolderModal
    | SettingsModal
    | AddToFolderModal
    | DeleteDesignModal
    | DeleteFolderModal

export class ModalsState {
    rootState: RootState
    openModal: ModalType | null = null

    constructor(rootState: RootState) {
        makeAutoObservable(this)
        this.rootState = rootState
    }

    openNewFolderModal(addSelectionOnSuccess?: boolean) {
        this.openModal = {type: 'NEW_FOLDER', addSelectionOnSuccess}
    }

    openSettingsModal() {
        this.openModal = {type: 'SETTINGS'}
    }

    openAddToFolderModal() {
        this.openModal = {type: 'ADD_TO_FOLDER'}
    }

    openDeleteDesignModal(designsIds: Design['id'][]) {
        this.openModal = {
            type: 'DELETE_DESIGN',
            designsIds,
        }
    }

    openDeleteFolderModal(folderId: string) {
        this.openModal = {
            type: 'DELETE_FOLDER',
            folderId,
        }
    }

    closeModal() {
        this.openModal = null
    }
}

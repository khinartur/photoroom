import type {Design} from '../types'
import type {Folder} from './folders'
import type {RootState} from './root'
import {makeAutoObservable, reaction} from 'mobx'

type SelectionFolderId = Folder['id'] | 'HOME'

export class SelectionState {
    rootState: RootState

    selectionFolderId: SelectionFolderId | null = null
    selection: Design['id'][] = []

    constructor(rootState: RootState) {
        makeAutoObservable(this)
        this.rootState = rootState

        reaction(
            () => this.selectionFolderId,
            selectionFolderId => {
                if (selectionFolderId === null) {
                    this.selection = []
                }
            },
        )

        reaction(
            () => this.rootState.appState.page,
            newPage => {
                if (newPage.type !== 'DESIGNS') {
                    this.selectionFolderId = null
                }
            },
        )
    }

    setSelectionFolderId(folderId: SelectionFolderId | null) {
        this.selectionFolderId = folderId
    }

    get selectionFolder(): Folder | null {
        if (!this.selectionFolderId || this.selectionFolderId === 'HOME') {
            return null
        }
        return (
            this.rootState.foldersState.folders.find(
                f => f.id === this.selectionFolderId,
            ) || null
        )
    }

    selectDesign(designId: Design['id']) {
        if (!this.selectionFolderId) {
            this.selectionFolderId =
                this.rootState.foldersState.activeFolder?.id || 'HOME'
        }
        this.selection = [...this.selection, designId]
    }

    unselectDesign(designId: Design['id']) {
        this.selection = this.selection.filter(id => id !== designId)
        if (this.selection.length === 0) {
            this.selectionFolderId = null
        }
    }
}

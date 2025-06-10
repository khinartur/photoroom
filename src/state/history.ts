import type {RootState} from './root'
import type {Design, Layer} from './designs'
import {makeAutoObservable, reaction} from 'mobx'

export type Folder = {
    id: string
    name: string
    designsIds: Design['id'][]
}

export class HistoryState {
    rootState: RootState
    undoCount = 0
    redoLayer: Layer | null = null

    constructor(rootState: RootState) {
        makeAutoObservable(this)
        this.rootState = rootState

        reaction(
            () => this.rootState.designsState.activeDesign,
            () => {
                this.undoCount = 0
                this.redoLayer = null
            },
        )

        reaction(
            () => this.rootState.designsState.activeDesign?.layers,
            (newVal, prevVal) => {
                if (newVal && prevVal && newVal.length > prevVal.length) {
                    this.undoCount++
                }
            },
        )
    }

    undo() {
        if (this.undoCount === 0) {
            return
        }
        this.undoCount--
        const removed = this.rootState.designsState.removeLastLayer()
        if (removed) {
            this.redoLayer = removed
        }
    }

    get canUndo() {
        return this.undoCount > 0
    }

    redo() {
        if (this.redoLayer) {
            this.rootState.designsState.addLayer(this.redoLayer)
            this.redoLayer = null
        }
    }

    get canRedo() {
        return this.redoLayer !== null
    }
}

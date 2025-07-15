import {makeAutoObservable, reaction} from 'mobx'
import type {RootState} from './root'
import type {IDBPDatabase} from 'idb'
import type {PhotoroomDBSchema} from '../utils/idb'
import type {Layer} from './designs'

type EditorTool = (clickX: number, clickY: number) => void

export class EditorState {
    rootState: RootState
    db: IDBPDatabase<PhotoroomDBSchema>

    defaultFontSize = 0
    selectedLayer: Layer | null = null
    selectedTool: EditorTool | null = null
    selectedEmoji: string | null = null

    constructor(rootState: RootState, db: IDBPDatabase<PhotoroomDBSchema>) {
        makeAutoObservable(this)
        this.rootState = rootState
        this.db = db

        reaction(
            () => this.activeDesign,
            design => {
                if (design) {
                    this.defaultFontSize =
                        Math.min(design.image.width, design.image.height) / 10
                }
            },
        )
    }

    get activeDesign() {
        const id =
            this.rootState.appState.page.type === 'EDITOR'
                ? this.rootState.appState.page.designId
                : null
        if (!id) {
            return null
        }
        return this.rootState.designsState.designs.find(d => d.id === id)
    }

    setSelectedLayer(layerId: Layer['id'] | null) {
        if (!layerId) {
            this.selectedLayer = null
            return
        }

        const activeDesign = this.activeDesign
        if (!activeDesign) {
            return
        }
        this.selectedLayer =
            this.activeDesign.layers.find(layer => layer.id === layerId) ?? null
    }

    addLayer(layer: Layer) {
        if (!this.activeDesign) {
            return
        }
        this.activeDesign.layers = [...this.activeDesign.layers, layer]
    }

    deleteLayer(layerId: Layer['id']) {
        if (!this.activeDesign) {
            return
        }
        this.activeDesign.layers = this.activeDesign.layers.filter(
            layer => layer.id !== layerId,
        )
    }

    removeLastLayer() {
        if (!this.activeDesign) {
            return
        }
        const removed = {
            ...this.activeDesign.layers[this.activeDesign.layers.length - 1],
        }
        this.activeDesign.layers = [...this.activeDesign.layers.slice(0, -1)]
        return removed
    }

    updateLayerVisibility(layerId: string, hidden: boolean) {
        if (!this.activeDesign) return

        this.activeDesign.layers = this.activeDesign.layers.map(layer =>
            layer.id === layerId ? {...layer, hidden} : layer,
        )
    }

    updateLayerPosition(layerId: string, x: number, y: number) {
        if (!this.activeDesign) return

        this.activeDesign.layers = this.activeDesign.layers.map(layer =>
            layer.id === layerId && layer.type === 'EMOJI'
                ? {...layer, x, y}
                : layer,
        )
    }

    applyTool(clickX: number, clickY: number) {
        this.selectedTool?.(clickX, clickY)
    }

    addEmojiTool(clickX: number, clickY: number) {
        if (!this.selectedEmoji) {
            return
        }
        this.addLayer({
            id: crypto.randomUUID(),
            hidden: false,
            type: 'EMOJI',
            name: 'Emoji',
            emoji: this.selectedEmoji,
            x: clickX,
            y: clickY,
        })
    }

    selectEmojiTool() {
        this.selectedTool = this.addEmojiTool
    }

    selectEmoji(emoji: string) {
        this.selectedEmoji = emoji
    }

    resetTool() {
        this.selectedTool = null
    }
}

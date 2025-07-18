import {makeAutoObservable, reaction} from 'mobx'
import type {RootState} from './root'
import type {IDBPDatabase} from 'idb'
import type {PhotoroomDBSchema} from '../utils/idb'
import type {Layer} from './designs'
import type {DragState, EditorTool} from '../types'
import {DEFAULT_DRAG_STATE} from '../constants'
import {isChangeableLayer} from '../utils'

export class EditorState {
    rootState: RootState
    db: IDBPDatabase<PhotoroomDBSchema>

    dragState: DragState = DEFAULT_DRAG_STATE
    defaultFontSize = 0
    selectedLayerId: Layer['id'] | null = null
    selectedTool: EditorTool | null = null
    selectedText: string | null = null
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

    setDragState(newState: Partial<DragState>) {
        this.dragState = {
            ...this.dragState,
            ...newState,
        }
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

    setSelectedLayerId(layerId: Layer['id'] | null) {
        this.selectedLayerId = layerId
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
        if (!this.activeDesign) {
            return
        }

        this.activeDesign.layers = this.activeDesign.layers.map(layer =>
            layer.id === layerId ? {...layer, hidden} : layer,
        )
    }

    updateLayerPosition(layerId: string, x: number, y: number) {
        if (!this.activeDesign) {
            return
        }

        this.activeDesign.layers = this.activeDesign.layers.map(layer =>
            layer.id === layerId && isChangeableLayer(layer)
                ? {...layer, x, y}
                : layer,
        )
    }

    updateLayerFontSize(layerId: string, fontSize: number) {
        if (!this.activeDesign) {
            return
        }

        this.activeDesign.layers = this.activeDesign.layers.map(layer =>
            layer.id === layerId && isChangeableLayer(layer)
                ? {...layer, fontSize}
                : layer,
        )
    }

    applyTool(clickX: number, clickY: number) {
        this.selectedTool?.tool(clickX, clickY)
    }

    addTextTool(clickX: number, clickY: number) {
        if (!this.selectedText) {
            return
        }
        this.addLayer({
            id: crypto.randomUUID(),
            hidden: false,
            type: 'TEXT',
            name: 'Text',
            text: this.selectedText,
            x: clickX,
            y: clickY,
        })
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

    selectTextTool() {
        this.selectedTool = {
            type: 'TEXT',
            tool: this.addTextTool.bind(this),
        }
    }

    selectEmojiTool() {
        this.selectedTool = {
            type: 'EMOJI',
            tool: this.addEmojiTool.bind(this),
        }
    }

    selectText(text: string) {
        this.selectedText = text
    }

    selectEmoji(emoji: string) {
        this.selectedEmoji = emoji
    }

    resetTool() {
        this.selectedTool = null
    }
}

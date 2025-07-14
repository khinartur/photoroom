import {makeAutoObservable} from 'mobx'
import type {RootState} from './root'
import type {IDBPDatabase} from 'idb'
import type {PhotoroomDBSchema} from '../utils/idb'
import type {Layer} from './designs'

type EditorTool = (clickX: number, clickY: number) => void

export class EditorState {
    rootState: RootState
    db: IDBPDatabase<PhotoroomDBSchema>

    selectedTool: EditorTool | null = null
    selectedEmoji: string | null = null
    defaultFontSize = 0

    constructor(rootState: RootState, db: IDBPDatabase<PhotoroomDBSchema>) {
        makeAutoObservable(this)
        this.rootState = rootState
        this.db = db
    }

    applyTool(clickX: number, clickY: number) {
        this.selectedTool?.(clickX, clickY)
    }

    addEmojiTool(clickX: number, clickY: number) {
        if (!this.selectedEmoji) {
            return
        }
        this.rootState.designsState.addLayer({
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

    setDefaultFontSize(size: number) {
        this.defaultFontSize = size
    }

    get selectedLayer(): Layer | undefined {
        const activeDesign = this.rootState.designsState.activeDesign
        if (!activeDesign || !activeDesign.selectedLayerId) {
            return undefined
        }
        return activeDesign.layers.find(
            l => l.id === activeDesign.selectedLayerId,
        )
    }
}

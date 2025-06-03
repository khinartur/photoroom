import {makeAutoObservable} from 'mobx'
import type {RootState} from './root'
import type {IDBPDatabase} from 'idb'
import type {PhotoroomDBSchema} from '../utils/idb'

type EditorTool = (clickX: number, clickY: number) => void

export class EditorState {
    rootState: RootState
    db: IDBPDatabase<PhotoroomDBSchema>

    selectedTool: EditorTool | null = null
    selectedEmoji: string | null = null

    constructor(rootState: RootState, db: IDBPDatabase<PhotoroomDBSchema>) {
        makeAutoObservable(this)
        this.rootState = rootState
        this.db = db
    }

    addEmojiTool(clickX: number, clickY: number) {
        const activeDesign = this.rootState.designsState.activeDesign
        if (!activeDesign || !this.selectedEmoji) {
            return
        }
        activeDesign.layers = [
            ...activeDesign.layers,
            {
                id: crypto.randomUUID(),
                type: 'EMOJI',
                name: 'Emoji',
                emoji: this.selectedEmoji,
                x: clickX,
                y: clickY,
            },
        ]
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

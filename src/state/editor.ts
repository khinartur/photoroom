import {makeAutoObservable} from 'mobx'
import type {IDBPDatabase} from 'idb'
import type {PhotoroomDBSchema} from '../utils/idb'

type EditorTool = 'EMOJI'

export class EditorState {
    db: IDBPDatabase<PhotoroomDBSchema>

    selectedTool: EditorTool | null = null
    selectedEmoji: string | null = null

    constructor(db: IDBPDatabase<PhotoroomDBSchema>) {
        makeAutoObservable(this)
        this.db = db
    }

    selectEmojiTool() {
        this.selectedTool = 'EMOJI'
    }

    selectEmoji(emoji: string) {
        this.selectedEmoji = emoji
    }

    resetTool() {
        this.selectedTool = null
    }
}

import {makeAutoObservable} from 'mobx'
import {createContext} from 'react'

type EditorTool = 'EMOJI'

export class EditorState {
    selectedTool: EditorTool | null = null
    selectedEmoji: string | null = null

    constructor() {
        makeAutoObservable(this)
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

export const EditorStateContext = createContext<EditorState>(new EditorState())

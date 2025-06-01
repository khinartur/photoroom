import {makeAutoObservable} from 'mobx'
import {createContext} from 'react'

type EditorTool = 'EMOJI'

export class EditorState {
    selectedTool: EditorTool | null = null

    constructor() {
        makeAutoObservable(this)
    }

    selectEmojiTool() {
        this.selectedTool = 'EMOJI'
    }

    resetTool() {
        this.selectedTool = null
    }
}

export const EditorStateContext = createContext<EditorState>(new EditorState())

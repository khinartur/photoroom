import {makeAutoObservable} from 'mobx'
import {createContext} from 'react'

export type Folder = {
    id: string
    name: string
}

export class FoldersState {
    folders: Folder[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addFolder(folder: Folder) {
        this.folders.push(folder)
    }
}

export const FoldersStateContext = createContext<FoldersState>(
    new FoldersState(),
)

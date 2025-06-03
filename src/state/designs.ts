import type {IDBPDatabase} from 'idb'
import type {RootState} from './root'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'
import {
    loadDesignsFromDB,
    saveDesignsToDB,
    type PhotoroomDBSchema,
} from '../utils/idb'

export type ImageLayer = {
    id: string
    type: 'IMAGE'
    name: 'Photo'
    image: HTMLImageElement
}

export type EmojiLayer = {
    id: string
    type: 'EMOJI'
    name: 'Emoji'
    emoji: string
    x: number
    y: number
}

export type Layer = ImageLayer | EmojiLayer

export type Design = {
    id: string
    image: HTMLImageElement
    layers: Layer[]
}

export class DesignsState {
    rootState: RootState
    db: IDBPDatabase<PhotoroomDBSchema>

    designs: Design[] = []

    constructor(rootState: RootState, db: IDBPDatabase<PhotoroomDBSchema>) {
        makeAutoObservable(this)
        this.rootState = rootState
        this.db = db
        this.init()

        reaction(
            () => ({
                designs: this.designs,
                layers: this.designs.map(design => design.layers),
            }),
            newVal => {
                const plainDesigns = toJS(newVal.designs)
                saveDesignsToDB(this.db, plainDesigns)
            },
        )
    }

    async init() {
        const storedDesigns = await loadDesignsFromDB(this.db)
        runInAction(() => {
            this.designs = storedDesigns ?? []
        })
    }

    get activeDesign() {
        const id =
            this.rootState.appState.page.type === 'EDITOR'
                ? this.rootState.appState.page.designId
                : null
        if (!id) {
            return null
        }
        return this.designs.find(d => d.id === id)
    }

    addDesign(design: Design) {
        this.designs = [...this.designs, design]
    }
}

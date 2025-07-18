import type {IDBPDatabase} from 'idb'
import type {RootState} from './root'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'
import {
    loadDesignsFromDB,
    saveDesignsToDB,
    type PhotoroomDBSchema,
} from '../utils'
import type {Design} from '../types'

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

    addDesign(design: Design) {
        this.designs = [...this.designs, design]
    }

    deleteDesigns(ids: Design['id'][]) {
        this.designs = this.designs.filter(d => !ids.includes(d.id))
    }
}

import type {IDBPDatabase} from 'idb'
import {openDB} from 'idb'
import type {AppTheme} from '../state/app'
import type {Design} from '../types'
import type {Folder} from '../state/folders'
import type {SerializedDesign} from './serializers'
import {deserializeDesign, serializeDesign} from './serializers'

const DB_NAME = 'PhotoroomAppDB'
const DB_VERSION = 2

export type PhotoroomDBSchema = {
    state: {
        key: 'theme' | 'designs' | 'folders'
        value: Design[] | Folder[] | string
    }
}

export const initDB = async () => {
    let needFoldersMigration = false

    const db = await openDB<PhotoroomDBSchema>(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion, newVersion) {
            if (!db.objectStoreNames.contains('state')) {
                db.createObjectStore('state')
            }

            needFoldersMigration = oldVersion === 1 && newVersion === 2
        },
    })

    if (needFoldersMigration) {
        const tx = db.transaction('state', 'readwrite')
        const store = tx.objectStore('state')
        const folders = await store.get('folders')

        if (folders) {
            const updatedFolders = (folders as Folder[]).map(folder => ({
                ...folder,
                designsIds: [],
            }))
            await store.put(updatedFolders, 'folders')
        }

        await tx.done
    }

    return db
}

export const saveDesignsToDB = async (
    db: IDBPDatabase<PhotoroomDBSchema>,
    designs: Design[],
) => {
    const serializedDesigns = designs.map(serializeDesign)
    await db.put('state', serializedDesigns as unknown as Design[], 'designs')
}

export const loadDesignsFromDB = async (
    db: IDBPDatabase<PhotoroomDBSchema>,
): Promise<Design[]> => {
    const result = await db.get('state', 'designs')
    if (!result) {
        return []
    }
    const serializedDesigns = result as unknown as SerializedDesign[]
    return Promise.all(serializedDesigns.map(deserializeDesign))
}

export const saveFoldersToDB = async (
    db: IDBPDatabase<PhotoroomDBSchema>,
    folders: Folder[],
) => {
    await db.put('state', folders, 'folders')
}

export const loadFoldersFromDB = async (
    db: IDBPDatabase<PhotoroomDBSchema>,
): Promise<Folder[]> => {
    const result = await db.get('state', 'folders')
    return (result ?? []) as Folder[]
}

export const saveThemeToDB = async (
    db: IDBPDatabase<PhotoroomDBSchema>,
    theme: AppTheme,
) => {
    await db.put('state', theme, 'theme')
}

export const loadThemeFromDB = async (
    db: IDBPDatabase<PhotoroomDBSchema>,
): Promise<AppTheme | null> => {
    const result = await db.get('state', 'theme')
    return (result as AppTheme) ?? null
}

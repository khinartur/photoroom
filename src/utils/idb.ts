import type {IDBPDatabase} from 'idb'
import {openDB} from 'idb'
import type {AppTheme} from '../state/app'
import type {Folder} from '../state/folders'

const DB_NAME = 'PhotoroomAppDB'
const DB_VERSION = 1

export type PhotoroomDBSchema = {
    state: {
        key: 'folders' | 'theme'
        value: Folder[] | string
    }
}

export const initDB = async () => {
    return await openDB<PhotoroomDBSchema>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('state')) {
                db.createObjectStore('state')
            }
        },
    })
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

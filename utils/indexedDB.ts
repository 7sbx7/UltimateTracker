import type { ActivityType } from 'types/activityTypes'

export const useIndexedDB = (storeName: string) => {
  const request = window.indexedDB.open('UltimateTracker', 2)

  request.onupgradeneeded = event => {
    const db = (event.target as IDBOpenDBRequest).result

    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, {
        keyPath: 'id',
        autoIncrement: true,
      })
    }
  }

  const getDB = (): Promise<IDBDatabase> => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request: IDBOpenDBRequest = window.indexedDB.open(
        'UltimateTracker',
        2,
      )
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  const addItem = async (item: ActivityType) => {
    const db: IDBDatabase = await getDB()
    const transaction: IDBTransaction = db.transaction(storeName, 'readwrite')
    const objectStore: IDBObjectStore = transaction.objectStore(storeName)

    return new Promise((resolve, reject) => {
      const request: IDBRequest = objectStore.add(item)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  const getAllItems = async (): Promise<ActivityType[]> => {
    const db: IDBDatabase = await getDB()
    const transaction: IDBTransaction = db.transaction(storeName, 'readonly')
    const objectStore: IDBObjectStore = transaction.objectStore(storeName)

    return new Promise((resolve, reject) => {
      const request: IDBRequest = objectStore.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  const getStoreLength = async (): Promise<number> => {
    const db: IDBDatabase = await getDB()
    const transaction: IDBTransaction = db.transaction(storeName, 'readonly')
    const objectStore: IDBObjectStore = transaction.objectStore(storeName)

    return new Promise((resolve, reject) => {
      const request: IDBRequest = objectStore.count()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  return {
    addItem,
    getAllItems,
    getStoreLength,
  }
}

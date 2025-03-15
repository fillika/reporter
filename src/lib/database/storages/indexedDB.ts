import type { IDatabase } from "./types";

type Args = {
    dbName: string;
    version: number;
    weeksStorageKey: string;
    tasksStorageKey: string;
};

class IndexedDBStorage<T, W> implements IDatabase<T, W> {
    private db!: IDBDatabase;
    private dbName: string;
    private version: number;
    private weeksStorageKey: string;
    private tasksStorageKey: string;

    constructor({ dbName, version, weeksStorageKey, tasksStorageKey }: Args) {
        this.dbName = dbName;
        this.version = version;
        this.weeksStorageKey = weeksStorageKey;
        this.tasksStorageKey = tasksStorageKey;

        const request = window.indexedDB.open(this.dbName, this.version);
        request.onsuccess = (event: any) => {
            this.db = event.target.result;
        };
        request.onerror = () => {
            throw new Error("Error opening database");
        };
        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (!db.objectStoreNames.contains(this.weeksStorageKey)) {
                db.createObjectStore(this.weeksStorageKey, { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains(this.tasksStorageKey)) {
                const taskStore = db.createObjectStore(this.tasksStorageKey, { keyPath: "id" });
                taskStore.createIndex("weekId", "weekId", { unique: false });
            }
        };
    }

    async getTask(weekId: string, key: string): Promise<T | undefined> {
        const transaction = this.db.transaction(this.tasksStorageKey, "readonly");
        const store = transaction.objectStore(this.tasksStorageKey);
        const index = store.index("weekId");
        const request = index.get(weekId);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const task = request.result.tasks[key];
                resolve(task);
            };
            request.onerror = () => {
                reject(undefined);
            };
        });
    }

    async saveTask(weekId: string, key: string, value: T): Promise<boolean> {
        const transaction = this.db.transaction(this.tasksStorageKey, "readwrite");
        const store = transaction.objectStore(this.tasksStorageKey);
        const index = store.index("weekId");
        const request = index.get(weekId);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const week = request.result;
                week.tasks[key] = value;
                const updateRequest = store.put(week);
                updateRequest.onsuccess = () => {
                    resolve(true);
                };
                updateRequest.onerror = () => {
                    reject(false);
                };
            };
            request.onerror = () => {
                reject(false);
            };
        });
    }

    async deleteTask(weekId: string, key: string): Promise<boolean> {
        const transaction = this.db.transaction(this.tasksStorageKey, "readwrite");
        const store = transaction.objectStore(this.tasksStorageKey);
        const index = store.index("weekId");
        const request = index.get(weekId);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const week = request.result;
                delete week.tasks[key];
                const updateRequest = store.put(week);
                updateRequest.onsuccess = () => {
                    resolve(true);
                };
                updateRequest.onerror = () => {
                    reject(false);
                };
            };
            request.onerror = () => {
                reject(false);
            };
        });
    }

    async getWeek(key: string): Promise<W | undefined> {
        const transaction = this.db.transaction(this.weeksStorageKey, "readonly");
        const store = transaction.objectStore(this.weeksStorageKey);
        const request = store.get(key);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = () => {
                reject(undefined);
            };
        });
    }

    async saveWeek(key: string, value: W): Promise<boolean> {
        const transaction = this.db.transaction(this.weeksStorageKey, "readwrite");
        const store = transaction.objectStore(this.weeksStorageKey);
        const request = store.put(value);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                resolve(true);
            };
            request.onerror = () => {
                reject(false);
            };
        });
    }

    async deleteWeek(key: string): Promise<boolean> {
        const transaction = this.db.transaction(this.weeksStorageKey, "readwrite");
        const store = transaction.objectStore(this.weeksStorageKey);
        const request = store.delete(key);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                resolve(true);
            };
            request.onerror = () => {
                reject(false);
            };
        });
    }
}

export default IndexedDBStorage;

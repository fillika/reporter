import type { IDatabase } from "./types";
import CONSTANTS from "$lib/utils/constants";

const {
    DB_NAME,
    DB_VERSION,
    INDEXES: { WEEKS, TASKS },
} = CONSTANTS;

class IndexedDBStorage<T extends { id: string }, W extends { id: string }> implements IDatabase<T, W> {
    private db!: IDBDatabase;

    constructor() {
        this.db;
    }

    init(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(DB_NAME, DB_VERSION);

            request.onsuccess = (event: any) => {
                this.db = event.target.result;
                resolve(true);
            };
            request.onerror = () => {
                throw new Error("Error opening database");
            };
            request.onupgradeneeded = (event) => {
                this.db = (event.target as any).result;

                // Создаю хранилище недель
                const weekStore = this.db.createObjectStore(WEEKS, { keyPath: "id" });
                weekStore.createIndex("name", "name", { unique: false });
                weekStore.createIndex("createdAt", "createdAt", { unique: false });

                const taskStore = this.db.createObjectStore(TASKS, { keyPath: "id" });
                taskStore.createIndex("weekId", "weekId", { unique: false });
                taskStore.createIndex("title", "title", { unique: false });
                taskStore.createIndex("notes", "notes", { unique: false });
                taskStore.createIndex("issue", "issue", { unique: false });
                taskStore.createIndex("createdAt", "createdAt", { unique: false });
                taskStore.createIndex("startTime", "startTime", { unique: false });
                taskStore.createIndex("endTime", "endTime", { unique: false });
                taskStore.createIndex("completionPercentage", "completionPercentage", { unique: false });
                taskStore.createIndex("isCompleted", "isCompleted", { unique: false });
            };
        });
    }

    async addTask(task: T): Promise<boolean> {
        const transaction = this.db.transaction(TASKS, "readwrite");
        const tasks = transaction.objectStore(TASKS);

        return new Promise((resolve, reject) => {
            const request = tasks.add(task);
            request.onsuccess = function () {
                resolve(true);
            };
            request.onerror = function () {
                reject(false);
            };
        });
    }

    async getTask(taskId: string): Promise<T | undefined> {
        const transaction = this.db.transaction(TASKS, "readonly");
        const tasks = transaction.objectStore(TASKS);

        return new Promise((resolve, reject) => {
            const request = tasks.get(taskId);
            request.onsuccess = function () {
                resolve(request.result);
            };
            request.onerror = function () {
                reject(undefined);
            };
        });
    }

    async getTasks(weekId: string): Promise<{ [key: string]: T }> {
        const transaction = this.db.transaction(TASKS, "readonly");
        const tasks = transaction.objectStore(TASKS);

        return new Promise((resolve, reject) => {
            const index = tasks.index("weekId");
            const request = index.getAll(weekId);
            request.onsuccess = function () {
                const resultArray = request.result as T[];
                const resultObject = resultArray.reduce((acc, item) => {
                    acc[item.id] = item;
                    return acc;
                }, {} as { [key: string]: T });
                resolve(resultObject);
            };
            request.onerror = function () {
                reject({});
            };
        });
    }

    async updateTask(task: T): Promise<boolean> {
        const transaction = this.db.transaction(TASKS, "readwrite");
        const tasks = transaction.objectStore(TASKS);

        return new Promise((resolve, reject) => {
            const request = tasks.put(task);
            request.onsuccess = function () {
                resolve(true);
            };
            request.onerror = function () {
                reject(false);
            };
        });
    }

    async deleteTask(taskId: string): Promise<boolean> {
        const transaction = this.db.transaction(TASKS, "readwrite");
        const tasks = transaction.objectStore(TASKS);

        return new Promise((resolve, reject) => {
            const request = tasks.delete(taskId);
            request.onsuccess = function () {
                resolve(true);
            };
            request.onerror = function () {
                reject(false);
            };
        });
    }

    async addWeek(week: W): Promise<boolean> {
        const transaction = this.db.transaction(WEEKS, "readwrite");
        const weeks = transaction.objectStore(WEEKS);

        return new Promise((resolve, reject) => {
            const request = weeks.add(week);
            request.onsuccess = function () {
                resolve(true);
            };
            request.onerror = function () {
                reject(false);
            };
        });
    }

    async getWeek(weekId: string): Promise<W | undefined> {
        const transaction = this.db.transaction(WEEKS, "readonly");
        const weeks = transaction.objectStore(WEEKS);

        return new Promise((resolve, reject) => {
            const request = weeks.get(weekId);
            request.onsuccess = function () {
                resolve(request.result);
            };
            request.onerror = function () {
                reject(undefined);
            };
        });
    }

    async getWeeks(): Promise<{ [key: string]: W }> {
        const transaction = this.db.transaction(WEEKS, "readonly");
        const weeks = transaction.objectStore(WEEKS);

        return new Promise((resolve, reject) => {
            const request = weeks.getAll();
            request.onsuccess = function (event) {
                const resultArray = request.result as W[];
                const resultObject = resultArray.reduce((acc, item) => {
                    acc[item.id] = item;
                    return acc;
                }, {} as { [key: string]: W });
                resolve(resultObject);
            };
            request.onerror = function (event) {
                reject(event);
            };
        });
    }

    async updateWeek(week: W): Promise<boolean> {
        const transaction = this.db.transaction(WEEKS, "readwrite");
        const weeks = transaction.objectStore(WEEKS);

        return new Promise((resolve, reject) => {
            const request = weeks.put(week);
            request.onsuccess = function () {
                resolve(true);
            };
            request.onerror = function () {
                reject(false);
            };
        });
    }

    async deleteWeek(weekId: string): Promise<boolean> {
        const transaction = this.db.transaction(WEEKS, "readwrite");
        const weeks = transaction.objectStore(WEEKS);

        return new Promise((resolve, reject) => {
            const request = weeks.delete(weekId);
            request.onsuccess = function () {
                resolve(true);
            };
            request.onerror = function (event) {
                reject(false);
            };
        });
    }
}

export default IndexedDBStorage;

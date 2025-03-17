import type { IDatabase } from "./types";
import CONSTANTS from "$lib/utils/constants";
const {
    DB_NAME,
    INDEXES: { TASKS, WEEKS },
} = CONSTANTS;

class LocalStorageDB<T extends { id: string }, W extends { id: string }> implements IDatabase<T, W> {
    private db: Storage;

    constructor() {
        this.db = window.localStorage;

        if (!this.getDb()) {
            this.setDb({
                [TASKS]: {},
                [WEEKS]: {},
            });
        }
    }

    async init(): Promise<boolean> {
        return true;
    }

    async addTask(task: T): Promise<boolean> {
        try {
            const dbData = this.getDb();
            if (!dbData) return false;

            dbData[TASKS][task.id] = task;
            this.setDb(dbData);
            return true;
        } catch (error) {
            console.error("Error adding task", error);
            return false;
        }
    }

    async getTask(taskId: string): Promise<T | undefined> {
        const dbData = this.getDb();
        if (!dbData) return undefined;

        return dbData[TASKS][taskId];
    }

    async getTasks(weekId: string): Promise<{ [key: string]: T }> {
        const result: { [key: string]: T } = {};

        const dbData = this.getDb();
        if (!dbData) return result;

        for (const taskId in dbData[TASKS]) {
            const task = dbData[TASKS][taskId];
            if (task.weekId === weekId) {
                result[taskId] = task;
            }
        }

        return result;
    }

    async updateTask(task: T): Promise<boolean> {
        try {
            const dbData = this.getDb();
            if (!dbData) return false;

            dbData[TASKS][task.id] = task;
            this.setDb(dbData);
            return true;
        } catch (error) {
            console.error("Error updating task", error);
            return false;
        }
    }

    async deleteTask(taskId: string): Promise<boolean> {
        try {
            const dbData = this.getDb();
            if (!dbData) return false;

            delete dbData[TASKS][taskId];
            this.setDb(dbData);
            return true;
        } catch (error) {
            console.error("Error deleting task", error);
            return false;
        }
    }

    async addWeek(week: W): Promise<boolean> {
        try {
            const dbData = this.getDb();
            if (!dbData) return false;

            dbData[WEEKS][week.id] = week;
            this.setDb(dbData);
            return true;
        } catch (error) {
            console.error("Error adding week", error);
            return false;
        }
    }

    async getWeek(weekId: string): Promise<W | undefined> {
        const dbData = this.getDb();
        if (!dbData) return undefined;

        return dbData[WEEKS][weekId];
    }

    async getWeeks(): Promise<{ [key: string]: W }> {
        const dbData = this.getDb();
        if (!dbData) return {};

        return dbData[WEEKS];
    }

    async updateWeek(week: W): Promise<boolean> {
        try {
            const dbData = this.getDb();
            if (!dbData) return false;

            dbData[WEEKS][week.id] = week;
            this.setDb(dbData);
            return true;
        } catch (error) {
            console.error("Error updating week", error);
            return false;
        }
    }

    async deleteWeek(weekId: string): Promise<boolean> {
        try {
            const dbData = this.getDb();
            if (!dbData) return false;

            delete dbData[WEEKS][weekId];
            this.setDb(dbData);
            return true;
        } catch (error) {
            console.error("Error deleting week", error);
            return false;
        }
    }

    private getDb() {
        const data = this.db.getItem(DB_NAME);
        if (!data) return undefined;
        return JSON.parse(data);
    }

    private setDb(data: any) {
        this.db.setItem(DB_NAME, JSON.stringify(data));
    }
}

export default LocalStorageDB;

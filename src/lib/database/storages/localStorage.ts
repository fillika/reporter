import type { IDatabase } from "./types";

class LocalStorageDB<T, W> implements IDatabase<T, W> {
    private db: Storage;

    constructor() {
        this.db = globalThis.localStorage;
    }

    async getTask(weekId: string, key: string) {
        try {
            const weekReport = await this.getWeek(weekId);
            if (weekReport) {
                return weekReport.tasks[key];
            }
        } catch (error) {
            console.error("Error getting task", error);
            return undefined;
        }
    }

    async saveTask(weekId: string, key: string, value: T) {
        try {
            const weekReport = await this.getWeek(weekId);
            if (weekReport) {
                weekReport.tasks[key] = value;
                return await this.saveWeek(weekId, weekReport);
            } else {
                console.error("No week found for the task", weekId);
                return false;
            }
        } catch (error) {
            console.error("Error saving task", error);
            return false;
        }
    }

    async deleteTask(weekId: string, key: string) {
        const weekReport = await this.getWeek(weekId);
        if (weekReport) {
            delete weekReport.tasks[key];
            return await this.saveWeek(weekId, weekReport);
        } else {
            console.error("No week found for the task", weekId);
            return false;
        }
    }

    async getWeek(key: string) {
        const value = this.db.getItem(key);
        if (value) return JSON.parse(value);
        return undefined;
    }

    async saveWeek(key: string, value: W) {
        this.db.setItem(key, JSON.stringify(value));
        return true;
    }

    async deleteWeek(key: string) {
        this.db.removeItem(key);
        return true;
    }
}

export default LocalStorageDB;

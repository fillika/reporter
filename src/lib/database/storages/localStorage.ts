import type { IDatabase } from "./types";
import CONSTANTS from "$lib/utils/constants";

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
        const dbData = this.getDb();
        if (!dbData) return undefined;

        const value = JSON.parse(dbData)[key];
        if (value) return value;
        return undefined;
    }

    async getWeeks(): Promise<{ [key: string]: W }> {
        const dbData = this.getDb();
        if (!dbData) return {};
        return JSON.parse(dbData);
    }

    async saveWeek(key: string, value: W) {
        const dbData = this.getDb();
        if (!dbData) {
            this.db.setItem(CONSTANTS.DB_NAME, JSON.stringify({ [key]: value }));
            return true;
        };

        const db = JSON.parse(dbData);
        db[key] = value;
        this.db.setItem(CONSTANTS.DB_NAME, JSON.stringify(db));
        return true;
    }

    async deleteWeek(key: string) {
        const dbData = this.getDb();
        if (!dbData) return true;

        const db = JSON.parse(dbData);
        delete db[key];
        this.db.setItem(CONSTANTS.DB_NAME, JSON.stringify(db));
        return true;
    }

    private getDb() {
        return this.db.getItem(CONSTANTS.DB_NAME);
    }
}

export default LocalStorageDB;

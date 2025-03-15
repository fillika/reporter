import type { Task, WeekReport } from "$lib/weeksManaging/types";
import type { IDatabase } from "../storages/types";

import LocalStorageDB from "../storages/localStorage";

class DBManager<T, W> implements IDatabase<T, W> {
    private db: IDatabase<T, W>;

    constructor(db: IDatabase<T, W>) {
        this.db = db;
    }

    async getTask(weekId: string, key: string) {
        return this.db.getTask(weekId, key);
    }

    async saveTask(weekId: string, key: string, value: T) {
        return this.db.saveTask(weekId, key, value);
    }

    async deleteTask(weekId: string, key: string) {
        return this.db.deleteTask(weekId, key);
    }

    async getWeek(key: string) {
        return this.db.getWeek(key);
    }

    async getWeeks() {
        return this.db.getWeeks();
    }

    async saveWeek(key: string, value: W) {
        return this.db.saveWeek(key, value);
    }

    async deleteWeek(key: string) {
        return this.db.deleteWeek(key);
    }
}

const storage = new LocalStorageDB<Task, WeekReport>();
export default new DBManager(storage);

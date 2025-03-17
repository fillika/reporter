import type { IDatabase } from "../storages/types";

class DBManager<T, W> implements IDatabase<T, W> {
    private db: IDatabase<T, W>;

    constructor(db: IDatabase<T, W>) {
        this.db = db;
    }

    init() {
        return this.db.init();
    }

    async addTask(task: T): Promise<boolean> {
        return this.db.addTask(task);
    }

    async getTask(taskId: string): Promise<T | undefined> {
        return this.db.getTask(taskId);
    }

    async getTasks(weekId: string): Promise<{ [key: string]: T }> {
        return this.db.getTasks(weekId);
    }

    async updateTask(task: T): Promise<boolean> {
        return this.db.updateTask(task);
    }

    async deleteTask(taskId: string): Promise<boolean> {
        return this.db.deleteTask(taskId);
    }

    async addWeek(week: W): Promise<boolean> {
        return this.db.addWeek(week);
    }

    async getWeek(weekId: string): Promise<W | undefined> {
        return this.db.getWeek(weekId);
    }

    async getWeeks(): Promise<{ [key: string]: W }> {
        return this.db.getWeeks();
    }

    async updateWeek(week: W): Promise<boolean> {
        return this.db.updateWeek(week);
    }

    async deleteWeek(weekId: string): Promise<boolean> {
        return this.db.deleteWeek(weekId);
    }
}

export default DBManager;

export interface IDatabase<T, W> {
    getTask(weekId: string, key: string): Promise<T | undefined>;
    // getTasks(weekId: string): Promise<{ [key: string]: T }>;
    saveTask(weekId: string, key: string, value: T): Promise<boolean>;
    deleteTask(weekId: string, key: string): Promise<boolean>;

    getWeek(key: string): Promise<W | undefined>;
    getWeeks(): Promise<{ [key: string]: W }>;
    saveWeek(key: string, value: W): Promise<boolean>;
    deleteWeek(key: string): Promise<boolean>;
}

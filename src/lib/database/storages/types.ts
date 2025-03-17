export interface IDatabase<T, W> {
    init(): Promise<boolean>;

    addTask(task: T): Promise<boolean>;
    getTask(taskId: string): Promise<T | undefined>;
    getTasks(weekId: string): Promise<{ [key: string]: T }>;
    updateTask(task: T): Promise<boolean>;
    deleteTask(taskId: string): Promise<boolean>;

    addWeek(week: W): Promise<boolean>;
    getWeek(weekId: string): Promise<W | undefined>;
    getWeeks(): Promise<{ [key: string]: W }>;
    updateWeek(week: W): Promise<boolean>;
    deleteWeek(weekId: string): Promise<boolean>;
}

export interface Task {
    id: string;
    title: string;
    notes: string;
    createdAt: number;
    startTime: number;
    endTime?: number | undefined;
    completionPercentage: number;
    isCompleted: boolean;
}

export interface TaskCollection {
    [taskId: string]: Task;
}

export interface WeeklyReport {
    [reportId: string]: {
        name: string;
        createdAt: number;
        tasks: TaskCollection,
    };
}
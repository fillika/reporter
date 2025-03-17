export interface Task {
    id: string;
    weekId: string,
    title: string;
    notes: string;
    issue?: string;
    createdAt: number;
    startTime: number;
    endTime?: number | undefined;
    completionPercentage: number;
    isCompleted: boolean;
}

export interface TaskCollection {
    [taskId: string]: Task;
}

export interface WeekReport {
    id: string;
    name: string;
    createdAt: number;
}
export interface Task {
    title: string;
    notes: string;
    createdAt: number;
    startTime: number;
    endTime: number;
    completionPercentage: number;
    isCompleted: boolean;
}

export interface WeeklyReport {
    [reportId: string]: {
        name: string;
        createdAt: number;
        tasks: {
            [taskId: string]: Task;
        },
    };
}
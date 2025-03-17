import type { TaskCollection, WeekReport } from "$lib/weeksManaging/types";

export function prepareWeekReport(report: WeekReport, tasks: TaskCollection) {
    let result = "";

    result += report.name + "\n\n";

    for (const taskId in tasks) {
        const task = tasks[taskId];
        result += `${task.title}\n`;

        // result += `[Задача создана ${new Date(task.createdAt).toLocaleString()}]\n`;
        result += `[Задача завершена на ${task.completionPercentage}%]\n`;
        if (task.issue) result += `[issue/${task.issue}]\n`;

        result += "\n";
        result += task.notes;
        result += "\n\n";
        result += "----------------------------------";
        result += "\n\n";
    }

    return result;
}

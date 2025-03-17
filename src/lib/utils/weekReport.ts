import type { WeekReport } from "$lib/weeksManaging/types";

export function prepareWeekReport(report: WeekReport) {
    let result = "";

    result += report.name + "\n\n";

    for (const taskId in report.tasks) {
        const task = report.tasks[taskId];
        result += `${task.title}\n`;

        // result += `[Задача создана ${new Date(task.createdAt).toLocaleString()}]\n`;
        result += `[Задача завершена на ${task.completionPercentage}%]\n`;

        result += task.notes;
        result += "\n\n";
    }

    return result;
}

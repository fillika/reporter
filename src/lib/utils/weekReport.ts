import type { TaskCollection, WeekReport } from "$lib/weeksManaging/types";

const SPLITTER = "----------------------------------";

export function prepareWeekReport(report: WeekReport, tasks: TaskCollection) {
    let result = "";

    result += report.name + "\n\n";

    const tasksReports = [];
    for (const taskId in tasks) {
        let result = "";
        const task = tasks[taskId];
        result += `${task.title}\n`;

        // result += `[Задача создана ${new Date(task.createdAt).toLocaleString()}]\n`;
        result += `[Задача завершена на ${task.completionPercentage}%]\n`;
        if (task.issue) result += `[issue/${task.issue}]\n`;

        result += "\n";
        result += task.notes;

        tasksReports.push(result);
    }

    result += tasksReports.join(`\n\n${SPLITTER}\n\n`);

    return result;
}

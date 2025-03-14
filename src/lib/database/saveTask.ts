import type { Task } from "../weeksManaging/types";
import getWeek from "./getWeek";
import updateWeek from "./updateWeek";

export default async function saveTask(task: Task): Promise<boolean> {
    const [reportId, report] = await getWeek();
    report.tasks[task.id] = task;

    return await updateWeek("weekId", { [reportId]: report });
}

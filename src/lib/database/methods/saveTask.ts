import type { Task } from "../../weeksManaging/types";
import dbManager from "$lib/database/manager/manager";

export default async function saveTask(weekId: string, task: Task): Promise<boolean> {
    return await dbManager.saveTask(weekId, task.id, task);
}

import dbManager from "$lib/database/manager/manager";

export default function deleteTask(weekId: string, taskId: string): Promise<boolean> {
    return dbManager.deleteTask(weekId, taskId);
}

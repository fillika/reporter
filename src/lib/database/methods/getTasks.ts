import type { TaskCollection } from "$lib/weeksManaging/types";
import getWeek from "./getWeek";

export default async function getTasks(): Promise<TaskCollection> {
    const [_, reportData] = await getWeek();
    return reportData.tasks;
}

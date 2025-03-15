import dbManager from "$lib/database/manager/manager";
import type { WeekReport } from "$lib/weeksManaging/types";

export default function getWeeks(): Promise<{ [key: string]: WeekReport }> {
    return dbManager.getWeeks();
}

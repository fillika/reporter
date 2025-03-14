import type { WeeklyReport } from "$lib/weeksManaging/types";
import CONSTANTS from "$lib/utils/constants";

export default async function createNewWeek(report: WeeklyReport): Promise<void> {
    return new Promise((resolve) => {
        localStorage.setItem(CONSTANTS.LS_REPORT_KEY, JSON.stringify(report));
        resolve();
    });
}

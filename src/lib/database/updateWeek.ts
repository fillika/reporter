import type { WeeklyReport } from "$lib/weeksManaging/types";
import CONSTANTS from '$lib/utils/constants';

export default async function updateWeek(weekId: string, report: WeeklyReport): Promise<boolean> {
    return new Promise((resolve, reject) => {        
        localStorage.setItem(CONSTANTS.LS_REPORT_KEY, JSON.stringify(report));
        resolve(true);
    });
}
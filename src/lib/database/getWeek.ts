import CONSTANTS from '$lib/utils/constants';
import type { WeeklyReport } from '$lib/weeksManaging/types';

export default async function getWeek(): Promise<[string, WeeklyReport[keyof WeeklyReport]]> {
    return new Promise((resolve, reject) => {
        const data = localStorage.getItem(CONSTANTS.LS_REPORT_KEY);
        if (!data) {
            reject(new Error("No data found"));
            return;
        }
        const report: WeeklyReport = JSON.parse(data);
        const result = Object.entries(report)[0] as [string, WeeklyReport[keyof WeeklyReport]];
        resolve(result);
    });
}
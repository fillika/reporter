import type { WeeklyReport } from "./types";
import generateUUID from "$lib/utils/generateUUID";
import createNewWeek from "$lib/database/createNewWeek";
import { clearDatabase } from "$lib/database/clearDatabase";

export async function startNewWeek(name: string = generateWeekName()): Promise<void> {
    await clearDatabase();
    return createNewWeek(createWeeklyReport(name));
}

function generateWeekName(): string {
    const date = new Date();
    const weekNumber = getWeekNumber(date);
    const year = date.getFullYear();
    return `Week ${weekNumber} - ${year}`;
}

function getWeekNumber(date: Date): number {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startDate.getDay() + 1) / 7);
    return weekNumber;
}

function createWeeklyReport(name: string): WeeklyReport {
    return {
        [generateUUID()]: {
            name,
            createdAt: Date.now(),
            tasks: {},
        },
    };
}

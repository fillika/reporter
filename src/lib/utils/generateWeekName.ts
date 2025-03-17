export default function generateWeekName(): string {
    const date = new Date();
    const weekNumber = getWeekNumber(date);
    const year = date.getFullYear();
    return `Неделя #${weekNumber} - ${year}`;
}

function getWeekNumber(date: Date): number {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startDate.getDay() + 1) / 7);
    return weekNumber;
}

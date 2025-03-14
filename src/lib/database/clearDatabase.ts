import CONSTANTS from "$lib/utils/constants";

export async function clearDatabase(): Promise<void> {
    return new Promise((resolve) => {
        localStorage.removeItem(CONSTANTS.LS_REPORT_KEY);
        resolve();
    });
}

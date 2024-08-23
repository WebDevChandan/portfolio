export function getUpdatedData(prevData: Record<string, any>, currentData: Record<string, any>): Record<string, any> {
    const updatedData: Record<string, any> = {};

    for (const key in currentData) {
        if (prevData.hasOwnProperty(key)) {
            if (JSON.stringify(prevData[key]) !== JSON.stringify(currentData[key]) && !!currentData[key].length && !!prevData[key].length) {
                updatedData[key] = currentData[key];
            }
        }
    }

    return updatedData;
}
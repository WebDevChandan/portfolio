export function getUpdatedData(prevData: Record<string, any>, currentData: Record<string, any>): Record<string, any> {
    const updatedData: Record<string, any> = {};

    for (const key in prevData) {
        if (prevData.hasOwnProperty(key)) {
            if (JSON.stringify(prevData[key]) !== JSON.stringify(currentData[key])) {
                updatedData[key] = currentData[key];
            }
        }
    }

    return updatedData;
}
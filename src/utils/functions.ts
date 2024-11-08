export function convertToInt(id: string | undefined) {
    let numericId = 0
    if (typeof id === "string") {
        numericId = parseInt(id, 10);
    }
    return numericId;
}

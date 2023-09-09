export function getKeyByValue(enumObject: any, value: number): string | undefined {
    for (const key in enumObject) {
        if (enumObject.hasOwnProperty(key) && enumObject[key] === value) {
            return key;
        }
    }
    return undefined; // Valor no encontrado en el enum
}
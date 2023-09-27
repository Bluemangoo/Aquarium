export default function checkInList(originValue: undefined | string | string[], defaultValue: string, list: string[]) {
    if (typeof originValue == "object") {
        throw new Error();
    }
    let value = originValue ?? defaultValue;
    if (list.indexOf(value) == -1) {
        throw new Error();
    }
    return value;
}
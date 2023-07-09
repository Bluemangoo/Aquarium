export default function notNull<T>(value: T, defaultValue: T): T {
    if (value == null) {
        return defaultValue;
    }
    return value;
}
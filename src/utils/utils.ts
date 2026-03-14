export default function removeTimezone(date: Date): string {
    return date.toLocaleDateString("sv-SE");
}

export function normalizeDate(date: number): string {
    return String(date).padStart(2, "0");
}

export function formatDays(n: number): string {
    const mod10 = n % 10;
    const mod100 = n % 100;

    if (mod100 >= 11 && mod100 <= 14) return `${n} дней`;
    if (mod10 === 1) return `${n} день`;
    if (mod10 >= 2 && mod10 <= 4) return `${n} дня`;
    return `${n} дней`;
}

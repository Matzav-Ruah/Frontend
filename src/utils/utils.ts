export default function removeTimezone(date: Date): string {
    return date.toLocaleDateString("sv-SE");
}

export function normalizeDate(date: number): string {
    return String(date).padStart(2, "0");
}    

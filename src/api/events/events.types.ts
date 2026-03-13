export interface EventSchema {
    id: number;
    emotional_state: "bad" | "neutral" | "good";
    date: string;
    event_data: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

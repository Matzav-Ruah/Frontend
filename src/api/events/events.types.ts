export interface EventSchema {
    id: number;
    emotional_state: "bad" | "neutral" | "good";
    data: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

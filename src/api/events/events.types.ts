export interface EventSchema {
    id: number;
    emotional_state: "bad" | "neutral" | "good";
    date: string;
    event_data: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

export interface CreateEventSchema {
    emotional_state: "bad" | "neutral" | "good"
    event_data: Record<string, unknown>
    date: string
}

export interface UpdateEventSchema {
    date: string
    emotional_state?: "bad" | "neutral" | "good"
    event_data?: Record<string, unknown>
}

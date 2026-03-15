export interface CsrfTokenResponse {
    csrftoken: string;
}

export interface SignInSchema {
    email: string;
    password: string;
}

export interface UserSchema {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    settings: Record<string, unknown>;
    streak_count: number;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

export interface LoginCredentials extends SignInSchema { }

export interface RegisterCredentials extends SignInSchema { }

export interface UserProfileSchema {
    id: number;
    username: string;
    streak_count: number;
}

export interface LeaderboardSchema {
    users: UserProfileSchema[];
    activeUserPosition: number;
}

export interface StreakSchema {
    streak_count: number;
}
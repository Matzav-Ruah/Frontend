import { apiClient } from '../client';
import { EventSchema } from './events.types';
import { ApiResponse } from '../types';
import { API_CONFIG } from '../config';
import "../interceptors";

export const getAllEvents = async (): Promise<ApiResponse<EventSchema[]>> => {
    const response = await apiClient.get<ApiResponse<EventSchema[]>>(
        API_CONFIG.ENDPOINTS.EVENTS.GET_ALL_EVENTS
    );
    if (response.data) {
        return response.data;
    }
    return { success: false, data: [] };
};


export const getEvent = async (event_id: number): Promise<ApiResponse<EventSchema>> => {
    const response = await apiClient.get<ApiResponse<EventSchema>>(
        API_CONFIG.ENDPOINTS.EVENTS.GET_EVENT,
        { params: { event_id } }
    );
    if (response.data) {
        return response.data;
    }
    return { success: false, data: {} as EventSchema };
};


export const createEvent = async (
    payload: { emotional_state: "bad" | "neutral" | "good"; data: Record<string, unknown> }
): Promise<ApiResponse<EventSchema>> => {
    const response = await apiClient.post<ApiResponse<EventSchema>>(
        API_CONFIG.ENDPOINTS.EVENTS.CREATE_EVENT,
        payload
    );
    if (response.data) {
        return response.data;
    }
    return { success: false, data: {} as EventSchema };
};


export const updateEvent = async (
    event_id: number,
    payload: { emotional_state?: "bad" | "neutral" | "good"; data?: Record<string, unknown> }
): Promise<ApiResponse<EventSchema>> => {
    const response = await apiClient.put<ApiResponse<EventSchema>>(
        `${API_CONFIG.ENDPOINTS.EVENTS.UPDATE_EVENT}/${event_id}`,
        payload
    );
    if (response.data) {
        return response.data;
    }
    return { success: false, data: {} as EventSchema };
};


export const deleteEvent = async (event_id: number): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await apiClient.delete<ApiResponse<Record<string, unknown>>>(
        `${API_CONFIG.ENDPOINTS.EVENTS.DELETE_EVENT}/${event_id}`
    );
    if (response.data) {
        return response.data;
    }
    return { success: false, data: {} };
};

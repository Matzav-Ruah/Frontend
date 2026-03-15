import { apiClient } from '../client';
import { CreateEventSchema, EventSchema, UpdateEventSchema } from './events.types';
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


export const getEvent = async (date: string): Promise<ApiResponse<EventSchema | null>> => {
    const response = await apiClient.get<ApiResponse<EventSchema | null>>(
        API_CONFIG.ENDPOINTS.EVENTS.GET_EVENT,
        { params: { date } }
    );
    if (response.data) {
        return response.data;
    }
    return { success: false, data: null };
};


export const createEvent = async (payload: CreateEventSchema): Promise<ApiResponse<EventSchema>> => {
    const response = await apiClient.post<ApiResponse<EventSchema>>(
        API_CONFIG.ENDPOINTS.EVENTS.CREATE_EVENT,
        payload
    );
    if (response.data) {
        return response.data;
    }
    return { success: false, data: {} as EventSchema };
};


export const updateEvent = async (payload: UpdateEventSchema): Promise<ApiResponse<EventSchema>> => {
    const response = await apiClient.put<ApiResponse<EventSchema>>(
        API_CONFIG.ENDPOINTS.EVENTS.UPDATE_EVENT,
        payload,
        { params: { date: payload.date } }
    );
    if (response.data) {
        return response.data;
    }
    return { success: false, data: {} as EventSchema };
};


export const deleteEvent = async (date: string): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await apiClient.delete<ApiResponse<Record<string, unknown>>>(
        API_CONFIG.ENDPOINTS.EVENTS.DELETE_EVENT,
        { params: { date } }
    );
    if (response.data) {
        return response.data;
    }
    return { success: false, data: {} };
};

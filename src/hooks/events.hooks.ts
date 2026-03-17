import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiResponse, ApiError } from '@/src/api/types';
import { CreateEventSchema, EventSchema, UpdateEventSchema } from '../api/events/events.types';
import { createEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from '@/src/api/events/events.api';

export const useGetAllEvents = (
    options?: Omit<UseQueryOptions<ApiResponse<EventSchema[]>, ApiError, ApiResponse<EventSchema[]>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ApiResponse<EventSchema[]>, ApiError>({
        queryKey: ['events', 'all'],
        queryFn: async () => getAllEvents(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export const useGetEvent = (
    date: string,
    options?: Omit<UseQueryOptions<ApiResponse<EventSchema | null>, ApiError, ApiResponse<EventSchema | null>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ApiResponse<EventSchema | null>, ApiError>({
        queryKey: ['events', date],
        queryFn: async () => getEvent(date),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export const useCreateEvent = (
    options?: Omit<UseMutationOptions<ApiResponse<EventSchema>, ApiError, CreateEventSchema>, 'mutationFn'>
) => {
    return useMutation<ApiResponse<EventSchema>, ApiError, CreateEventSchema>({
        mutationFn: async (data) => createEvent(data),
        ...options,
    });
};

export const useUpdateEvent = (
    options?: Omit<UseMutationOptions<ApiResponse<EventSchema>, ApiError, UpdateEventSchema>, 'mutationFn'>
) => {
    return useMutation<ApiResponse<EventSchema>, ApiError, UpdateEventSchema>({
        mutationFn: async (data) => updateEvent(data),
        ...options,
    });
}

export const useDeleteEvent = (
    options?: Omit<UseMutationOptions<ApiResponse<Record<string, unknown>>, ApiError, string>, 'mutationFn'>
) => {
    return useMutation<ApiResponse<Record<string, unknown>>, ApiError, string>({
        mutationFn: async (data) => deleteEvent(data),
        ...options,
    });
}

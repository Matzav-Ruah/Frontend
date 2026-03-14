import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiResponse, ApiError } from '@/src/api/types';
import { EventSchema } from '../api/events/events.types';
import { getAllEvents, getEvent } from '@/src/api/events/events.api';

export const useGetAllEvents = (
    options?: Omit<UseQueryOptions<ApiResponse<EventSchema[]>, ApiError, ApiResponse<EventSchema[]>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ApiResponse<EventSchema[]>, ApiError>({
        queryKey: ['events', 'all'],
        queryFn: async () => getAllEvents(),
        ...options,
    });
};

export const useGetEvent = (
    date: string,
    options?: Omit<UseQueryOptions<ApiResponse<EventSchema>, ApiError, ApiResponse<EventSchema>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ApiResponse<EventSchema>, ApiError>({
        queryKey: ['events', date],
        queryFn: async () => getEvent(date),
        ...options,
    });
};

import { useQueryClient } from "@tanstack/react-query";
import { useCreateEvent, useDeleteEvent, useUpdateEvent } from "../hooks/events.hooks";
import type { ApiResponse } from "@/src/api/types";
import type { StreakSchema } from "@/src/api/users/users.types";
import { EventSchema } from "../api/events/events.types";

export function useCreateEventMutation(widgetDate: string) {
    const queryClient = useQueryClient();
    const { mutate: createEvent, isPending } = useCreateEvent({
        onMutate: (data) => {
            queryClient.cancelQueries({
                queryKey: ["events", widgetDate],
            });
            queryClient.cancelQueries({
                queryKey: ["events", "all"],
            });
            queryClient.cancelQueries({
                queryKey: ["user", "streak"],
            });
            const previousData = queryClient.getQueryData(["events", widgetDate]);
            const previousAllEventsData = queryClient.getQueryData<ApiResponse<EventSchema[]>>(["events", "all"]);
            const previousStreakData = queryClient.getQueryData<ApiResponse<StreakSchema>>(["user", "streak"]);
            queryClient.setQueryData(
                ["events", widgetDate],
                {
                    success: true,
                    data: {
                        id: 0,
                        date: widgetDate,
                        emotional_state: data.emotional_state,
                        event_data: data.event_data,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                        in_streak: false,
                    }
                },
            );
            queryClient.setQueryData(
                ["events", "all"],
                {
                    success: true,
                    data: [...(previousAllEventsData?.data ?? []), {
                        id: 0,
                        date: widgetDate,
                        emotional_state: data.emotional_state,
                        event_data: data.event_data,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                        in_streak: false,
                    }]
                }
            );
            queryClient.setQueryData(
                ["user", "streak"],
                {
                    success: true,
                    data: {
                        streak_count: (previousStreakData?.data?.streak_count ?? 0) + 1,
                    }
                }
            );
            return { previousData, previousAllEventsData, previousStreakData };
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["events", widgetDate], data);
        },
        onError: (_, __, context: any) => {
            queryClient.setQueryData(["events", widgetDate], context?.previousData);
            queryClient.setQueryData(["events", "all"], context?.previousAllEventsData);
            queryClient.setQueryData(["user", "streak"], context?.previousStreakData);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["events", widgetDate],
            });
            queryClient.invalidateQueries({
                queryKey: ["events", "all"],
            });
            queryClient.invalidateQueries({
                queryKey: ["user", "streak"],
            });
            queryClient.invalidateQueries({
                queryKey: ["user", "leaderboard"],
            });
        }
    });
    return {
        createEvent,
        isPending,
    };
}

export function useUpdateEventMutation(widgetDate: string) {
    const queryClient = useQueryClient();
    const { mutate: updateEvent, isPending } = useUpdateEvent({
        onMutate: (variables) => {
            queryClient.cancelQueries({
                queryKey: ["events", widgetDate],
            });
            const previousData: any = queryClient.getQueryData(["events", widgetDate]);
            if (previousData?.data) {
                queryClient.setQueryData(["events", widgetDate], {
                    ...previousData,
                    data: {
                        ...previousData.data,
                        ...variables,
                    }
                });
            } else {
                queryClient.setQueryData(["events", widgetDate], {
                    success: true,
                    data: {
                        id: 0,
                        date: widgetDate,
                        emotional_state: variables.emotional_state,
                        event_data: variables.event_data || {},
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                        in_streak: false,
                    }
                });
            }
            return { previousData };
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["events", widgetDate], data);
        },
        onError: (_, __, context: any) => {
            if (context?.previousData) {
                queryClient.setQueryData(["events", widgetDate], context?.previousData);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["events", widgetDate],
            });
        }
    });
    return {
        updateEvent,
        isPending,
    };
}

export function useDeleteEventMutation(widgetDate: string) {
    const queryClient = useQueryClient();
    const { mutate: deleteEvent, isPending } = useDeleteEvent({
        onMutate: () => {
            queryClient.cancelQueries({
                queryKey: ["events", widgetDate],
            });
            queryClient.cancelQueries({
                queryKey: ["user", "streak"],
            });
            queryClient.cancelQueries({
                queryKey: ["events", "all"],
            });
            const previousData = queryClient.getQueryData(["events", widgetDate]);
            const previousAllEventsData = queryClient.getQueryData<ApiResponse<EventSchema[]>>(["events", "all"]);
            const previousStreakData = queryClient.getQueryData<ApiResponse<StreakSchema>>(["user", "streak"]);
            queryClient.setQueryData(["events", widgetDate], { success: true, data: null });
            queryClient.setQueryData(["events", "all"], {
                success: true,
                data: previousAllEventsData?.data?.map((event) => {
                    if (event.date === widgetDate) {
                        return {
                            ...event,
                            in_streak: false,
                            emotional_state: null,
                        };
                    }
                    return event;
                })
            });
            queryClient.setQueryData(["user", "streak"], {
                success: true,
                data: { streak_count: (previousStreakData?.data?.streak_count ?? 0) - 1 }
            });
            return { previousData, previousStreakData, previousAllEventsData };
        },
        onSuccess: () => {
            queryClient.setQueryData(["events", widgetDate], { success: true, data: null });
        },
        onError: (_, __, context: any) => {
            if (context?.previousData) {
                queryClient.setQueryData(["events", widgetDate], context?.previousData);
            }
            if (context?.previousStreakData) {
                queryClient.setQueryData(["user", "streak"], context?.previousStreakData);
            }
            if (context?.previousAllEventsData) {
                queryClient.setQueryData(["events", "all"], context?.previousAllEventsData);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["events", widgetDate],
            });
            queryClient.invalidateQueries({
                queryKey: ["user", "streak"],
            });
            queryClient.invalidateQueries({
                queryKey: ["user", "leaderboard"],
            });
            queryClient.invalidateQueries({
                queryKey: ["events", "all"],
            });
        }
    });
    return {
        deleteEvent,
        isPending,
    };
}
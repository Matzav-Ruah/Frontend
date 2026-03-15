import { useQueryClient } from "@tanstack/react-query";
import { useCreateEvent, useDeleteEvent, useUpdateEvent } from "../hooks/events.hooks";

export function useCreateEventMutation(widgetDate: string) {
    const queryClient = useQueryClient();
    const { mutate: createEvent, isPending } = useCreateEvent({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events", widgetDate] });
            queryClient.invalidateQueries({ queryKey: ["events", "all"] });
            queryClient.invalidateQueries({ queryKey: ["user", "current"] });
            queryClient.invalidateQueries({ queryKey: ["user", "streak"] });
            queryClient.invalidateQueries({ queryKey: ["user", "leaderboard"] });
        },
    });
    return {
        createEvent,
        isPending,
    };
}

export function useUpdateEventMutation(widgetDate: string) {
    const queryClient = useQueryClient();
    const { mutate: updateEvent, isPending } = useUpdateEvent({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events", widgetDate] });
            queryClient.invalidateQueries({ queryKey: ["events", "all"] });
            queryClient.invalidateQueries({ queryKey: ["user", "current"] });
        },
    });
    return {
        updateEvent,
        isPending,
    };
}

export function useDeleteEventMutation(widgetDate: string) {
    const queryClient = useQueryClient();
    const { mutate: deleteEvent, isPending } = useDeleteEvent({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events", widgetDate] });
            queryClient.invalidateQueries({ queryKey: ["events", "all"] });
            queryClient.invalidateQueries({ queryKey: ["user", "current"] });
            queryClient.invalidateQueries({ queryKey: ["user", "streak"] });
            queryClient.invalidateQueries({ queryKey: ["user", "leaderboard"] });
        },
    });
    return {
        deleteEvent,
        isPending,
    };
}
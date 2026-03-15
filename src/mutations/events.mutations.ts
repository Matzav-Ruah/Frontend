import { useQueryClient } from "@tanstack/react-query";
import { useCreateEvent, useDeleteEvent, useUpdateEvent } from "../hooks/events.hooks";


export default function useEventsMutations(widgetDate: string) {
    const queryClient = useQueryClient();
    const { mutate: createEvent } = useCreateEvent({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events", widgetDate] });
            queryClient.invalidateQueries({ queryKey: ["events", "all"] });
            queryClient.invalidateQueries({ queryKey: ["user", "current"] });
            queryClient.invalidateQueries({ queryKey: ["user", "streak"] });
        },
    });
    const { mutate: updateEvent } = useUpdateEvent({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events", widgetDate] });
            queryClient.invalidateQueries({ queryKey: ["events", "all"] });
            queryClient.invalidateQueries({ queryKey: ["user", "current"] });
        },
    });

    const { mutate: deleteEvent } = useDeleteEvent({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events", widgetDate] });
            queryClient.invalidateQueries({ queryKey: ["events", "all"] });
            queryClient.invalidateQueries({ queryKey: ["user", "current"] });
            queryClient.invalidateQueries({ queryKey: ["user", "streak"] });
        },
    });
    return {
        createEvent,
        updateEvent,
        deleteEvent,
    };
}
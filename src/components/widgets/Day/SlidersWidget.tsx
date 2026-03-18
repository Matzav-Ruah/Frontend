import { View } from "react-native";
import SliderElement from "./SliderElement";
import { useUpdateEventMutation } from "@/src/mutations/events.mutations";
import { useGetEvent } from "@/src/hooks/events.hooks";
import { useTheme } from "@/src/contexts/theme-context";
import { useQueryClient } from "@tanstack/react-query";

const defaultSliders = [
    {
        "title": "Самочувствие",
        "name": "wellbeing",
        "icon": "head-alert-outline"
    },
    {
        "title": "Настроение",
        "name": "mood",
        "icon": "emoticon-outline"
    },
    {
        "title": "Сон",
        "name": "sleep",
        "icon": "sleep"
    },
    {
        "title": "Социальная батарейка",
        "name": "social",
        "icon": "account-group-outline"
    },
];




export default function SlidersWidget({ widgetDate }: { widgetDate: string }) {
    const { colors } = useTheme();
    const { data: eventDataResponse } = useGetEvent(widgetDate);
    const eventData = eventDataResponse?.data;
    const { updateEvent } = useUpdateEventMutation(widgetDate);
    const queryClient = useQueryClient();
    
    if (!eventData) return null;

    const defaultValues = {
        "bad": {
            defaultValue: 1,
            color: colors.ind_bad,
        },
        "neutral": {
            defaultValue: 3,
            color: colors.ind_neutral,
        },
        "good": {
            defaultValue: 4,
            color: colors.ind_good,
        },
    };

    return (
        <View
            className="w-full bg-white rounded-3xl px-5 py-6 mb-4"
            style={{ boxShadow: colors.shadow }}
        >
            <View className="w-full flex-col gap-4">
                {defaultSliders.map((slider) => (
                    <SliderElement
                        key={slider.name}
                        title={slider.title}
                        iconName={slider.icon as any}
                        value={(
                            eventData.event_data[slider.name] as number ??
                            defaultValues[eventData.emotional_state].defaultValue
                        )}
                        onUpdate={(value) => {
                            const latestCache = queryClient.getQueryData<any>(["events", widgetDate]);
                            const latestEventData = latestCache?.data?.event_data || eventData.event_data || {};

                            updateEvent({
                                date: eventData.date,
                                event_data: {
                                    ...latestEventData,
                                    [slider.name]: value,
                                },
                            });
                        }}
                        color={defaultValues[eventData.emotional_state].color}
                    />
                ))}
            </View>
        </View>
    )
}
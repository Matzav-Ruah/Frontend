import { View } from "react-native";
import SliderElement from "./SliderElement";
import { useUpdateEventMutation } from "@/src/mutations/events.mutations";
import { EventSchema } from "@/src/api/events/events.types";
import colors from "@/src/theme/colors";

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


export default function SlidersWidget({ eventData }: { eventData: EventSchema }) {
    const { updateEvent } = useUpdateEventMutation(eventData?.date);

    return (
        <View className="w-full bg-white rounded-3xl px-5 py-6 mb-4">
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
                        onUpdate={(value) => updateEvent({
                            date: eventData.date,
                            event_data: {
                                ...eventData.event_data,
                                [slider.name]: value,
                            },
                        })}
                        color={defaultValues[eventData.emotional_state].color}
                    />
                ))}
            </View>
        </View>
    )
}
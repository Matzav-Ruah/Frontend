import { View } from "react-native";
import SliderElement from "./SliderElement";
import useEventsMutations from "@/src/mutations/events.mutations";
import { EventSchema } from "@/src/api/events/events.types";

const sliders = [
    {
        "title": "Головная боль",
        "name": "headache",
    },
    {
        "title": "Настроение",
        "name": "mood",
    },
    {
        "title": "Сон",
        "name": "sleep",
    },
    {
        "title": "Социальная батарейка",
        "name": "social",
    },
]

export default function SlidersWidget({ eventData }: { eventData: EventSchema }) {
    const { updateEvent } = useEventsMutations(eventData?.date);
    return (
        <View className="w-full bg-white rounded-3xl px-5 py-6 mb-4">
            <View className="w-full flex-col gap-4">
                {sliders.map((slider) => (
                    <SliderElement
                        key={slider.name}
                        title={slider.title}
                        value={(eventData.event_data[slider.name] ?? 50) as number}
                        onUpdate={(value) => updateEvent({
                            date: eventData.date,
                            event_data: {
                                ...eventData.event_data,
                                [slider.name]: value,
                            },
                        })}
                    />
                ))}
            </View>
        </View>
    )
}
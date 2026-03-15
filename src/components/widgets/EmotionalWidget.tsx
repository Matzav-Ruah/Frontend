import useEventsMutations from "@/src/mutations/events.mutations";
import { Text, TouchableOpacity, View } from "react-native";

interface EmotionalWidgetProps {
    widgetDate: string;
    showText?: boolean;
    selectedState?: "bad" | "neutral" | "good";
}

export default function EmotionalWidget({ widgetDate, showText = true, selectedState }: EmotionalWidgetProps) {
    const { createEvent, updateEvent, deleteEvent } = useEventsMutations(widgetDate);

    const handleClick = (state: "bad" | "neutral" | "good") => {
        if (selectedState && selectedState !== state) {
            updateEvent({ date: widgetDate, emotional_state: state });
            return;
        } else if (selectedState && selectedState === state) {
            deleteEvent(widgetDate);
            return;
        }
        createEvent({ emotional_state: state, event_data: {}, date: widgetDate });
    }

    return (
        <View className="flex items-center w-full mb-3 shadow-lg">
            {showText && <Text className="text-[17px] font-medium text-primary mb-2">Мое состояние сегодня</Text>}
            <View className="w-full bg-white rounded-full p-1.5 flex flex-row items-center justify-between shadow-sm border border-gray-100/30">
                <TouchableOpacity onPress={() => handleClick("bad")} className={`${selectedState ? selectedState === "bad" ? "bg-ind_bad" : "bg-gray-200" : "bg-ind_bad"} rounded-full px-2 py-4 flex-1 items-center justify-center`}>
                    <Text numberOfLines={1} className="text-white font-medium text-[14px]">Плохо</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClick("neutral")} className={`${selectedState ? selectedState === "neutral" ? "bg-ind_neutral" : "bg-gray-200" : "bg-ind_neutral"} rounded-full px-2 py-4 flex-[1.4] items-center justify-center mx-1`}>
                    <Text numberOfLines={1} className="text-white font-medium text-[14px]">Нормально</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClick("good")} className={`${selectedState ? selectedState === "good" ? "bg-ind_good" : "bg-gray-200" : "bg-ind_good"} rounded-full px-2 py-4 flex-1 items-center justify-center`}>
                    <Text numberOfLines={1} className="text-white font-medium text-[14px]">Хорошо</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
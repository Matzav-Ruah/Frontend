import { useCreateEventMutation, useDeleteEventMutation, useUpdateEventMutation } from "@/src/mutations/events.mutations";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import Skeleton from "@/src/components/Skeleton";

interface EmotionalWidgetProps {
    widgetDate: string;
    showText?: boolean;
    selectedState?: "bad" | "neutral" | "good";
    isLoading?: boolean;
}

export default function EmotionalWidget({ widgetDate, showText = true, selectedState, isLoading }: EmotionalWidgetProps) {
    const router = useRouter();
    const { createEvent } = useCreateEventMutation(widgetDate);
    const { updateEvent } = useUpdateEventMutation(widgetDate);
    const { deleteEvent } = useDeleteEventMutation(widgetDate);

    const handleClick = (state: "bad" | "neutral" | "good") => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        if (selectedState && selectedState !== state) {
            updateEvent({ date: widgetDate, emotional_state: state });
            return;
        } else if (selectedState && selectedState === state) {
            deleteEvent(widgetDate);
            return;
        }
        createEvent({ emotional_state: state, event_data: {}, date: widgetDate });
    }

    const handleOpenDay = () => {
        router.push({
            pathname: "/(pages)/day",
            params: {
                day: widgetDate.split("-")[2],
                month: widgetDate.split("-")[1],
                year: widgetDate.split("-")[0],
            },
        })
    }

    return (
        <View className="flex items-center w-full mb-3 shadow-lg">
            {
                showText &&
                <TouchableOpacity onPress={handleOpenDay}>
                    <Text className="text-[17px] font-medium text-primary mb-2">Мое состояние сегодня</Text>
                </TouchableOpacity>
            }
            <Skeleton
                show={isLoading}
                radius={32}
                height={60}
                width="100%"
            >
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
            </Skeleton>
        </View>
    )
}
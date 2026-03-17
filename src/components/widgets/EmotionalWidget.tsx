import { useCreateEventMutation, useDeleteEventMutation, useUpdateEventMutation } from "@/src/mutations/events.mutations";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import Skeleton from "@/src/components/Skeleton";
import { useTheme } from "@/src/contexts/theme-context";

interface EmotionalWidgetProps {
    widgetDate: string;
    showText?: boolean;
    selectedState?: "bad" | "neutral" | "good";
    isLoading?: boolean;
}

export default function EmotionalWidget({ widgetDate, showText = true, selectedState, isLoading }: EmotionalWidgetProps) {
    const router = useRouter();
    const { colors } = useTheme();
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
        <View className="flex items-center w-full mb-3">
            {
                showText &&
                <TouchableOpacity onPress={handleOpenDay}>
                    <Text
                        className="text-[17px] font-medium mb-2"
                        style={{ color: colors.primary }}
                    >Мое состояние сегодня</Text>
                </TouchableOpacity>
            }
            <Skeleton
                show={isLoading}
                radius={32}
                height={60}
                width="100%"
            >
                <View
                    className="w-full bg-white rounded-full p-1.5 flex flex-row items-center justify-between"
                    style={{ boxShadow: colors.shadow }}>
                    <TouchableOpacity
                        onPress={() => handleClick("bad")}
                        className="rounded-full px-2 py-4 flex-1 items-center justify-center"
                        style={{ backgroundColor: selectedState === "bad" ? colors.ind_bad : "#E5E7EB" }}
                    >
                        <Text numberOfLines={1} className="text-white font-medium text-[14px]">Плохо</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleClick("neutral")}
                        className="rounded-full px-2 py-4 flex-[1.4] items-center justify-center mx-1"
                        style={{ backgroundColor: selectedState === "neutral" ? colors.ind_neutral : "#E5E7EB" }}
                    >
                        <Text numberOfLines={1} className="text-white font-medium text-[14px]">Нормально</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleClick("good")}
                        className="rounded-full px-2 py-4 flex-1 items-center justify-center"
                        style={{ backgroundColor: selectedState === "good" ? colors.ind_good : "#E5E7EB" }}
                    >
                        <Text numberOfLines={1} className="text-white font-medium text-[14px]">Хорошо</Text>
                    </TouchableOpacity>
                </View>
            </Skeleton>
        </View>
    )
}
import { useCreateEventMutation, useDeleteEventMutation, useUpdateEventMutation } from "@/src/mutations/events.mutations";
import { useGetEvent } from "@/src/hooks/events.hooks";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import Skeleton from "@/src/components/Skeleton";
import { useTheme } from "@/src/contexts/theme-context";
import { useEffect, useState } from "react";
import { useDebaunce } from "@/src/hooks/useDebaunce";

interface EmotionalWidgetProps {
    widgetDate: string;
    showText?: boolean;
}

export default function EmotionalWidget({ widgetDate, showText = true }: EmotionalWidgetProps) {
    const { data: eventData, isLoading } = useGetEvent(widgetDate);
    const selectedState = eventData?.data?.emotional_state;

    const router = useRouter();
    const { colors } = useTheme();
    const [localState, setLocalState] = useState<"bad" | "neutral" | "good" | undefined>(selectedState);
    const debouncedState = useDebaunce(localState, 500);
    const { createEvent } = useCreateEventMutation(widgetDate);
    const { updateEvent } = useUpdateEventMutation(widgetDate);
    const { deleteEvent } = useDeleteEventMutation(widgetDate);

    const handleClick = (state: "bad" | "neutral" | "good") => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        setLocalState((prev) => (prev === state ? undefined : state));
    };

    useEffect(() => {
        setLocalState(selectedState);
    }, [selectedState]);

    useEffect(() => {
        if (debouncedState === selectedState) return;
        if (debouncedState && !selectedState) {
            createEvent({ emotional_state: debouncedState, event_data: {}, date: widgetDate });
        } else if (debouncedState && selectedState) {
            updateEvent({ date: widgetDate, emotional_state: debouncedState });
        } else if (!debouncedState && selectedState) {
            deleteEvent(widgetDate);
        }
    }, [debouncedState]);

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
                        style={{ backgroundColor: localState === "bad" ? colors.ind_bad : "#E5E7EB" }}
                    >
                        <Text numberOfLines={1} className="text-white font-medium text-[14px]">Плохо</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleClick("neutral")}
                        className="rounded-full px-2 py-4 flex-[1.4] items-center justify-center mx-1"
                        style={{ backgroundColor: localState === "neutral" ? colors.ind_neutral : "#E5E7EB" }}
                    >
                        <Text numberOfLines={1} className="text-white font-medium text-[14px]">Нормально</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleClick("good")}
                        className="rounded-full px-2 py-4 flex-1 items-center justify-center"
                        style={{ backgroundColor: localState === "good" ? colors.ind_good : "#E5E7EB" }}
                    >
                        <Text numberOfLines={1} className="text-white font-medium text-[14px]">Хорошо</Text>
                    </TouchableOpacity>
                </View>
            </Skeleton>
        </View>
    )
}
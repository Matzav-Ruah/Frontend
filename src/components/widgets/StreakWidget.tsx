import { formatDays } from "@/src/utils/utils";
import { View, Text } from "react-native";
import Skeleton from "@/src/components/Skeleton";

interface StreakWidgetProps {
    streak_count: number;
    isLoading?: boolean;
}

export default function StreakWidget({ streak_count, isLoading }: StreakWidgetProps) {
    return (
        <Skeleton
            show={isLoading}
            radius={32}
            height={117}
        >
            <View className="bg-white rounded-[32px] px-3 py-2 mb-4 shadow-sm border border-gray-100 flex flex-row items-center">
                <View className="w-[80px] h-[80px] rounded-[40px] border-[4px] border-[#5a8bff] flex items-center justify-center mx-3 my-3">
                    <Text className="text-ind_good text-3xl font-medium">{streak_count}</Text>
                </View>
                <View className="flex-1 mr-4">
                    <Text className="text-ind_good text-lg font-semibold">Ты отмечаешься</Text>
                    <Text className="text-ind_good text-lg font-semibold">уже {formatDays(streak_count)} подряд!</Text>
                </View>
            </View>
        </Skeleton>
    )
}

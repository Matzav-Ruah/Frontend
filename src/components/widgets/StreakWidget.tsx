import { formatDays } from "@/src/utils/utils";
import { View, Text } from "react-native";
import Skeleton from "@/src/components/Skeleton";
import { useTheme } from "@/src/contexts/theme-context";

interface StreakWidgetProps {
    streak_count: number;
    isLoading?: boolean;
}

export default function StreakWidget({ streak_count, isLoading }: StreakWidgetProps) {
    const { colors } = useTheme();
    return (
        <Skeleton
            show={isLoading}
            radius={32}
            height={117}
        >
            <View
                className="bg-white rounded-[32px] px-3 py-2 mb-4 border border-gray-100 flex flex-row items-center"
                style={{ boxShadow: colors.shadow }}
            >
                <View
                    className="w-[80px] h-[80px] rounded-[40px] border-[4px] flex items-center justify-center mx-3 my-3"
                    style={{ borderColor: colors.streak }}
                >
                    <Text className="text-3xl font-medium" style={{ color: colors.streak }}>{streak_count}</Text>
                </View>
                <View className="flex-1 mr-4">
                    <Text
                        className="text-lg font-semibold"
                        style={{ color: colors.streak }}
                    >Ты отмечаешься</Text>
                    <Text
                        className="text-lg font-semibold"
                        style={{ color: colors.streak }}
                    >уже {formatDays(streak_count)} подряд!</Text>
                </View>
            </View>
        </Skeleton>
    )
}

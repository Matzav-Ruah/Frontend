import { View, Text } from "react-native";

interface StreakWidgetProps {
    streak_count: number;
}

export default function StreakWidget({ streak_count }: StreakWidgetProps) {
    return (
        <View className="bg-white rounded-[32px] pl-3 py-2 mb-3 shadow-sm border border-gray-100 flex flex-row items-center">
            <View className="w-[80px] h-[80px] rounded-[40px] border-[4px] border-[#5a8bff] flex items-center justify-center mx-3 my-3">
                <Text className="text-ind_good text-3xl font-medium">{streak_count}</Text>
            </View>
            <Text className="text-ind_good text-lg font-medium flex-1 shrink">Ты отмечаешься уже целых {streak_count} дня подряд!</Text>
        </View>
    )
}

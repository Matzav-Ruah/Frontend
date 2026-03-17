import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useTheme } from "@/src/contexts/theme-context";

export default function StatsScreen() {
    const { colors } = useTheme();
    return (
        <View className="flex-1 h-full mt-[75%] mx-5">
            <View
                className="w-full bg-white rounded-3xl p-1.5 flex items-center justify-center border border-gray-100/30"
                style={{ boxShadow: colors.shadow }}
            >
                <MaterialIcons name="report-problem" size={100} color={colors.ind_good} />
                <Text className="text-[20px] font-bold" style={{ color: colors.ind_good }}>Упс...</Text>
                <Text
                    className="text-[16px] font-medium text-center"
                    style={{ color: colors.ind_good }}
                >
                    Пока тут пусто, но скоро появится твоя статистика!
                </Text>
            </View>
        </View>
    );
}
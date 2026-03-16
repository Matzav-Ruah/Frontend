import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "@/src/theme/colors";

export default function StatsScreen() {
    return (
        <View className="flex-1 h-full mt-[75%] mx-5">
            <View className="w-full bg-white rounded-3xl p-1.5 flex items-center justify-center shadow-sm border border-gray-100/30">
                <MaterialIcons name="report-problem" size={100} color={colors.ind_good} />
                <Text className="text-[20px] text-ind_good font-bold">Упс...</Text>
                <Text className="text-[16px] font-medium text-ind_good text-center">Пока тут пусто, но скоро появится твоя статистика!</Text>
            </View>
        </View>
    );
}
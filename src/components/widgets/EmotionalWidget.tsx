import { Text, View } from "react-native";

export default function EmotionalWidget() {
    return (
        <View className="flex items-center w-full mb-3 shadow-lg">
            <Text className="text-[17px] font-medium text-primary mb-2">Мое состояние сегодня</Text>
            <View className="w-full bg-white rounded-full p-1.5 flex flex-row items-center justify-between shadow-sm border border-gray-100/30">
                <View className="bg-ind_bad rounded-full px-2 py-4 flex-1 items-center justify-center">
                    <Text numberOfLines={1} className="text-white font-medium text-[14px]">Плохо</Text>
                </View>
                <View className="bg-ind_neutral rounded-full px-2 py-4 flex-[1.4] items-center justify-center mx-1">
                    <Text numberOfLines={1} className="text-white font-medium text-[14px]">Нормально</Text>
                </View>
                <View className="bg-ind_good rounded-full px-2 py-4 flex-1 items-center justify-center">
                    <Text numberOfLines={1} className="text-white font-medium text-[14px]">Хорошо</Text>
                </View>
            </View>
        </View>
    )
}
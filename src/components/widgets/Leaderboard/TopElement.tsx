import { UserProfileSchema } from "@/src/api/users/users.types";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";

interface TopElementProps {
    user: UserProfileSchema;
    index: number
    isActiveUser: boolean;
}

export default function TopElement({ user, isActiveUser, index }: TopElementProps) {
    let textColor = ""
    switch (index + 1) {
        case 1:
            textColor = "text-yellow-500"
            break;
        case 2:
            textColor = "text-gray-500"
            break;
        case 3:
            textColor = "text-orange-500"
            break;
        default:
            textColor = "text-ind_good"
            break;
    }
    if (isActiveUser) textColor = "text-ind_good"
    return (
        <TouchableOpacity
            className={`flex-row items-center justify-between bg-white rounded-3xl px-5 py-4 mb-2 shadow-sm`}
            activeOpacity={0.7}
        >
            <View className="flex-row items-center justify-between w-full">
                <Text className={`text-[16px] font-medium ${textColor}`}>
                    {user.username}
                </Text>
                <Text className={`text-[16px] font-medium ${textColor}`}>
                    {user.streak_count}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
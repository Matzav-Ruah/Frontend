import { UserProfileSchema } from "@/src/api/users/users.types";
import { useTheme } from "@/src/contexts/theme-context";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";

interface TopElementProps {
    user: UserProfileSchema;
    index: number
    isActiveUser: boolean;
}

export default function TopElement({ user, isActiveUser, index }: TopElementProps) {
    const { colors } = useTheme();
    let textColor = {}
    switch (index + 1) {
        case 1:
            textColor = { color: colors.gold }
            break;
        case 2:
            textColor = { color: colors.silver }
            break;
        case 3:
            textColor = { color: colors.bronze }
            break;
        default:
            textColor = { color: colors.ind_good }
            break;
    }
    if (isActiveUser) textColor = { color: colors.interface }
    return (
        <TouchableOpacity
            className={`flex-row items-center justify-between bg-white rounded-3xl px-5 py-4 mb-2`}
            style={{ boxShadow: colors.shadow }}
            activeOpacity={0.7}
        >
            <View className="flex-row items-center justify-between w-full">
                <Text className="text-[16px] font-medium" style={textColor}>
                    {user.username}
                </Text>
                <Text className="text-[16px] font-medium" style={textColor}>
                    {user.streak_count}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
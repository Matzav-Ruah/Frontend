import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native";
import { ComponentProps } from "react";

type FeatherIconName = ComponentProps<typeof Feather>["name"];

interface MenuElementProps {
    iconLeft?: FeatherIconName;
    iconLeftColor?: string;
    title: string;
    iconRight?: FeatherIconName;
    iconRightColor?: string;
    elementStyle?: string;
    textStyle?: string;
    onPress?: () => void;
}

export default function MenuElement({
    iconLeft,
    title,
    iconRight = "chevron-right",
    elementStyle,
    textStyle,
    onPress,
    iconLeftColor,
    iconRightColor,
}: MenuElementProps) {
    return (
        <TouchableOpacity
            className={`flex-row items-center justify-between bg-white rounded-3xl px-5 py-5 mb-3 shadow-sm ${elementStyle}`}
            activeOpacity={0.7}
            onPress={onPress ? onPress : undefined}
        >
            <View className="flex-row items-center">
                {iconLeft && <Feather name={iconLeft} size={22} color={iconLeftColor || "#64748b"} className="mr-4" />}
                <Text className={`text-[16px] font-medium ${textStyle || 'text-primary'}`}>
                    {title}
                </Text>
            </View>
            {iconRight && <Feather name={iconRight} size={20} color={iconRightColor || "#94a3b8"} />}
        </TouchableOpacity>
    );
}
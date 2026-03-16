import { Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

interface SliderElementProps {
    title: string;
    onUpdate: (value: number) => void;
    value: number;
    iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
}

export default function SliderElement({ title, onUpdate, value, iconName, color }: SliderElementProps) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return (
        <View className="w-full mb-2">
            <View className="flex-row justify-between items-center mb-2 px-1">
                <View className="flex-row items-center gap-2">
                    {iconName && <MaterialCommunityIcons name={iconName} size={20} color={color} />}
                    <Text className={`text-[15px] font-bold tracking-tight`} style={{ color }}>{title}</Text>
                </View>
                <View className={`bg-primary/10 px-2.5 py-0.5 rounded-full`}>
                    <Text className="text-[12px] font-bold" style={{ color }}>{localValue}/5</Text>
                </View>
            </View>

            <View className="bg-gray-50/50 rounded-2xl px-1 h-12 justify-center border border-gray-100/50">
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={1}
                    maximumValue={5}
                    step={1}
                    value={localValue}
                    onValueChange={(val) => setLocalValue(val)}
                    onSlidingComplete={(val) => onUpdate(val)}
                    minimumTrackTintColor={color}
                    maximumTrackTintColor="#E2E8F0"
                    thumbTintColor={color}
                />
            </View>
        </View>
    )
}
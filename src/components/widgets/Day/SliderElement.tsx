import { Text, View } from "react-native";
import Slider from "@react-native-community/slider";

interface SliderElementProps {
    title: string;
    onUpdate: (value: number) => void;
    value: number;
}

export default function SliderElement({ title, onUpdate, value }: SliderElementProps) {
    return (
        <View className="w-full">
            <Text className="text-[14px] font-medium text-gray-400 ml-1 mb-0">{title}</Text>
            <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={100}
                step={25}
                value={value}
                onSlidingComplete={(value) => onUpdate(value)}
                minimumTrackTintColor="#657D9E"
                maximumTrackTintColor="#F3F4F6"
                thumbTintColor="#657D9E"
            />
        </View>
    )
}
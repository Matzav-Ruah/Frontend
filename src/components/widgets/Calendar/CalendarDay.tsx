import { useTheme } from "@/src/contexts/theme-context";
import { View, TouchableOpacity, Text } from "react-native";

interface CalendarDayProps {
    day: number | null;
    emotionalState: "good" | "neutral" | "bad" | null;
    month: string;
    year: string;
    today: string;
    onPress: () => void;
    inStreak: boolean;
    isStreakStart?: boolean;
    isStreakEnd?: boolean;
}

export default function CalendarDay(
    {
        day,
        emotionalState,
        month,
        year,
        today,
        onPress,
        inStreak,
        isStreakStart,
        isStreakEnd
    }: CalendarDayProps) {
    const { colors } = useTheme();
    if (!day) return <View className="w-[14.28%] aspect-square" />
    let textStyle = colors.third
    let dayStyle = colors.third

    switch (emotionalState) {
        case "good":
            textStyle = colors.ind_good
            dayStyle = colors.ind_good
            break;
        case "neutral":
            textStyle = colors.ind_neutral
            dayStyle = colors.ind_neutral
            break;
        case "bad":
            textStyle = colors.ind_bad
            dayStyle = colors.ind_bad
            break;
    }
    const isToday = today === `${year}-${month}-${day}`

    if (isToday) {
        dayStyle = colors.third
        textStyle = colors.third
    }
    const isFuture = new Date(today) < new Date(`${year}-${month}-${day}`)
    if (isFuture) {
        dayStyle = colors.secondary
        textStyle = colors.secondary
    }

    return (
        <View className="w-[14.28%] aspect-square items-center justify-center py-1">
            {inStreak && (
                <View className="absolute flex-row w-full h-9 items-center justify-center">
                    <View
                        className={`h-9 absolute left-0 right-1/2 ${isStreakStart ? 'rounded-l-full ml-[15%]' : ''}`}
                        style={{ backgroundColor: colors.third + "30" }}
                    />
                    <View
                        className={`h-9 absolute left-1/2 right-0 ${isStreakEnd ? 'rounded-r-full mr-[15%]' : ''}`}
                        style={{ backgroundColor: colors.third + "30" }}
                    />
                </View>
            )}
            <TouchableOpacity
                className={`w-9 h-9 flex items-center justify-center rounded-full ${emotionalState ? "border-[2px]" : "border"}`}
                style={{ borderColor: dayStyle, backgroundColor: isToday ? colors.third + "20" : "transparent" }}
                key={`day-${day}`}
                onPress={onPress}
                disabled={isFuture}
            >
                <Text className={`${emotionalState || isToday ? "font-medium" : ""} text-sm`} style={{ color: textStyle }}>{day}</Text>
            </TouchableOpacity>
        </View>
    )
}

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
    if (!day) return <View className="w-[14.28%] aspect-square" />
    let textStyle = "text-primary"
    let dayStyle = "border border-light_third"

    switch (emotionalState) {
        case "good":
            textStyle = "text-ind_good"
            dayStyle = "border-[2px] border-ind_good"
            break;
        case "neutral":
            textStyle = "text-ind_neutral"
            dayStyle = "border-[2px] border-ind_neutral"
            break;
        case "bad":
            textStyle = "text-ind_bad"
            dayStyle = "border-[2px] border-ind_bad"
            break;
    }
    const isToday = today === `${year}-${month}-${day}`

    if (isToday) {
        dayStyle = "border-[2px] border-third bg-third/20"
        if (inStreak) {
            dayStyle = "border-[2px] border-third"
        }
        textStyle = "text-primary"
    }
    const isFuture = new Date(today) < new Date(`${year}-${month}-${day}`)
    if (isFuture) {
        dayStyle = "border border-secondary/50";
        textStyle = "text-secondary/50"
    }

    return (
        <View className="w-[14.28%] aspect-square items-center justify-center py-1">
            {inStreak && (
                <View className="absolute flex-row w-full h-9 items-center justify-center">
                    <View className={`h-9 bg-third/20 absolute left-0 right-1/2 ${isStreakStart ? 'rounded-l-full ml-[15%]' : ''}`} />
                    <View className={`h-9 bg-third/20 absolute left-1/2 right-0 ${isStreakEnd ? 'rounded-r-full mr-[15%]' : ''}`} />
                </View>
            )}
            <TouchableOpacity
                className={`w-9 h-9 flex items-center justify-center rounded-full ${dayStyle}`}
                key={`day-${day}`}
                onPress={onPress}
                disabled={isFuture}
            >
                <Text className={`text-sm font-medium ${textStyle}`}>{day}</Text>
            </TouchableOpacity>
        </View>
    )
}

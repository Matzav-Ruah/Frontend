import { View, TouchableOpacity, Text } from "react-native";

interface CalendarDayProps {
    day: number;
    emotionalState: "good" | "neutral" | "bad";
    month: string;
    year: string;
    today: string;
}

export default function CalendarDay({ day, emotionalState, month, year, today }: CalendarDayProps) {
    if (!day) return <View className="w-[14.28%] h-10" />
    let textStyle = "text-third"
    let dayStyle = "border border-third"
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
    if (isToday) dayStyle += " bg-[#7CCDFC]/20"
    if (new Date(today) < new Date(`${year}-${month}-${day}`)) {
        dayStyle = "border border-secondary/50";
        textStyle = "text-secondary/50"
    }
    return (
        <TouchableOpacity
            className={`w-[14.28%] h-10 flex items-center justify-center rounded-full ${dayStyle}`}
            key={`day-${day}`}
            onPress={() => console.log(`${day}.${month}.${year}`)}
        >
            <Text className={`font-medium ${textStyle}`}>{day}</Text>
        </TouchableOpacity>
    )
}

import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useMemo } from "react";
import { useGetAllEvents } from "@/src/hooks/events.hooks";
import CalendarDay from "./CalendarDay";
import removeTimezone, { normalizeDate } from "@/src/utils/utils";
import { useRouter } from "expo-router";

const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

const daysOfWeek = [
    'П',
    'В',
    'С',
    'Ч',
    'П',
    'С',
    'В'
]

interface dayScheme {
    day: number | null,
    emotionalState: "good" | "neutral" | "bad" | null,
    inStreak: boolean
}


export default function CalendarWidget() {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();
    const { data: events } = useGetAllEvents()

    const { year, month } = useMemo(() => {
        const y = currentDate.getFullYear();
        const m = currentDate.getMonth();
        return {
            year: normalizeDate(y),
            month: normalizeDate(m + 1),
        }
    }, [currentDate])

    const eventMap = useMemo(() => {
        const map: Record<string, { emotionalState: "good" | "neutral" | "bad", inStreak: boolean }> = {};
        if (!events?.data) return map;

        for (const event of events.data) {
            const eventDate = new Date(event.date);
            map[eventDate.toLocaleDateString("sv-SE")] = {
                emotionalState: event.emotional_state,
                inStreak: event.in_streak
            };
        }
        return map;
    }, [events]);

    const monthGrid = useMemo(() => {
        const y = currentDate.getFullYear();
        const m = currentDate.getMonth();
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        const firstDay = new Date(y, m, 1).getDay();
        const offset = firstDay === 0 ? 6 : firstDay - 1;
        const monthStr = String(m + 1).padStart(2, "0");
        const days: dayScheme[] = Array(offset).fill(null).map(
            () => ({ day: null, emotionalState: null, inStreak: false })
        );

        for (let i = 1; i <= daysInMonth; i++) {
            const dayStr = String(i).padStart(2, "0");
            const dateString = `${y}-${monthStr}-${dayStr}`;
            days.push({
                day: i,
                emotionalState: eventMap[dateString]?.emotionalState || null,
                inStreak: eventMap[dateString]?.inStreak || false,
            });
        }
        return days;
    }, [currentDate, eventMap]);

    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))

    return (
        <View>
            <View className="w-full flex flex-row items-center justify-between mb-3 px-5">
                <TouchableOpacity onPress={handlePrevMonth} disabled={currentDate.getMonth() === today.getMonth() + 1}>
                    <Feather
                        className={currentDate.getMonth() === today.getMonth() + 1 ? "opacity-0" : ""}
                        name="chevron-left"
                        size={28}
                        color="#657D9E"
                    />
                </TouchableOpacity>
                <Text className="text-2xl font-medium text-primary">{monthNames[currentDate.getMonth()]}</Text>
                <TouchableOpacity onPress={handleNextMonth} disabled={currentDate.getMonth() === today.getMonth()}>
                    <Feather
                        className={currentDate.getMonth() === today.getMonth() ? "opacity-0" : ""}
                        name="chevron-right"
                        size={28}
                        color="#657D9E"
                    />
                </TouchableOpacity>
            </View>
            <View className="bg-white rounded-[32px] px-3 py-2 mb-3 shadow-sm border border-gray-100">
                <View className="flex flex-row flex-wrap mb-2">
                    {daysOfWeek.map((day, index) => (
                        <View key={`${day}-${index}`} className="w-[14.28%] flex items-center justify-center py-2">
                            <Text className="text-sm font-medium text-gray-800">{day}</Text>
                        </View>
                    ))}
                </View>
                <View className="flex flex-row flex-wrap">
                    {monthGrid.map((day, index) => {
                        const isStreakStart = day.inStreak && (!monthGrid[index - 1]?.inStreak || index % 7 === 0);
                        const isStreakEnd = day.inStreak && (!monthGrid[index + 1]?.inStreak || index % 7 === 6);

                        return <CalendarDay
                            key={`day-${index}`}
                            year={year}
                            month={month}
                            day={day.day}
                            emotionalState={day.emotionalState}
                            today={removeTimezone(today)}
                            inStreak={day.inStreak}
                            isStreakStart={isStreakStart}
                            isStreakEnd={isStreakEnd}
                            onPress={() => {
                                router.push({
                                    pathname: "/(pages)/day",
                                    params: {
                                        day: normalizeDate(day.day!),
                                        month: month,
                                        year: year,
                                    }
                                })
                            }
                            }
                        />
                    })}
                </View>
            </View>
        </View>
    )
}
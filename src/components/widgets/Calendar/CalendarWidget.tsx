import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useMemo } from "react";
import { useGetAllEvents } from "@/src/hooks/events.hooks";
import CalendarDay from "./CalendarDay";
import removeTimezone, { normalizeDate } from "@/src/utils/utils";

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
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Вс'
]


export default function CalendarWidget() {
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
        const map: Record<string, string> = {};
        if (!events?.data) return map;

        for (const event of events.data) {
            const eventDate = new Date(event.date);
            map[eventDate.toLocaleDateString("sv-SE")] = event.emotional_state;
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
        const days = Array(offset).fill({ day: null, emotionalState: null });

        for (let i = 1; i <= daysInMonth; i++) {
            const dayStr = String(i).padStart(2, "0");
            const dateString = `${y}-${monthStr}-${dayStr}`;
            days.push({
                day: i,
                emotionalState: eventMap[dateString] || null
            });
        }
        return days;
    }, [currentDate, eventMap]);

    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))

    return (
        <View>
            <View className="w-full flex flex-row items-center justify-between mb-3">
                <TouchableOpacity onPress={handlePrevMonth} disabled={currentDate.getMonth() === today.getMonth() + 1}>
                    <Feather
                        className={currentDate.getMonth() === today.getMonth() + 1 ? "opacity-0" : ""}
                        name="chevron-left"
                        size={25}
                        color="#657D9E"
                    />
                </TouchableOpacity>
                <Text className="text-2xl font-medium text-primary">{monthNames[currentDate.getMonth()]}</Text>
                <TouchableOpacity onPress={handleNextMonth} disabled={currentDate.getMonth() === today.getMonth()}>
                    <Feather
                        className={currentDate.getMonth() === today.getMonth() ? "opacity-0" : ""}
                        name="chevron-right"
                        size={25}
                        color="#657D9E"
                    />
                </TouchableOpacity>
            </View>
            <View className="bg-white rounded-3xl px-5 py-5 mb-3 shadow-sm">
                <View className="flex flex-row flex-wrap">
                    {daysOfWeek.map((day) => (
                        <View key={day} className="w-[14.28%] flex items-center justify-center py-2">
                            <Text className="font-medium text-gray-500">{day}</Text>
                        </View>
                    ))}
                </View>
                <View className="flex flex-row flex-wrap">
                    {monthGrid.map((day, index) => {
                        return <CalendarDay
                            key={`day-${index}`}
                            year={year}
                            month={month}
                            day={day.day}
                            emotionalState={day.emotionalState}
                            today={removeTimezone(today)}
                        />
                    })}
                </View>
            </View>
        </View>
    )
}
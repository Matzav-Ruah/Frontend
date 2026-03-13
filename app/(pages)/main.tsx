import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useMemo } from "react";
import { useGetAllEvents } from "@/src/hooks/events.hooks";


const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export default function MainScreen() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();
    const { data: events } = useGetAllEvents()

    const { grid, month, year } = useMemo(() => {
        const y = currentDate.getFullYear();
        const m = currentDate.getMonth();
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        const firstDay = new Date(y, m, 1).getDay();
        const offset = firstDay === 0 ? 6 : firstDay;

        const days = Array(offset).fill(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(i);

        return { grid: days, month: m, year: y };
    }, [currentDate]);

    const eventMap = useMemo(() => {
        const map: Record<string, string> = {};
        if (events?.data) {
            events.data.forEach((event) => {
                const date = new Date(event.date);
                map[date.toISOString().split("T")[0]] = event.emotional_state;
            });
        }
        return map;
    }, [events]);

    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))

    return (
        <View className="flex-1">
            <ScrollView
                className="flex-1 px-6 pt-20"
                contentContainerStyle={{ paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="w-full flex flex-row items-center justify-between mb-3">
                    <TouchableOpacity onPress={handlePrevMonth} disabled={currentDate.getMonth() === today.getMonth() + 1}>
                        <Feather
                            className={currentDate.getMonth() === today.getMonth() + 1 ? "opacity-0" : ""}
                            name="chevron-left"
                            size={25}
                            color="#657D9E"
                        />
                    </TouchableOpacity>
                    <Text className="text-2xl font-medium text-primary">{monthNames[month]}</Text>
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
                        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                            <View key={day} className="w-[14.28%] flex items-center justify-center py-2">
                                <Text className="font-medium text-gray-500">{day}</Text>
                            </View>
                        ))}
                    </View>

                    <View className="flex flex-row flex-wrap">
                        {grid.map((day, index) => {
                            if (day === null) {
                                return <View key={`empty-${index}`} className="w-[14.28%] h-10" />;
                            }

                            const this_day = new Date(year, month, day)
                            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const emotionalState = eventMap[dateStr];

                            const isToday = this_day.toDateString() === today.toDateString();

                            let bgColor = "border-[1px] border-[#A8D5F2]";
                            let textColor = emotionalState ? `text-ind_${emotionalState}` : "text-[#A8D5F2]"
                            if (this_day > today) {
                                bgColor = "border-[1px] border-gray-200";
                                textColor = "text-gray-200"
                            }
                            else if (emotionalState === "good") {
                                bgColor = "border-2 border-ind_good";
                            }
                            else if (emotionalState === "neutral") {
                                bgColor = "border-2 border-ind_neutral";
                            }
                            else if (emotionalState === "bad") {
                                bgColor = "border-2 border-ind_bad";
                            }
                            if (isToday) bgColor += " bg-[#7CCDFC]/20"

                            return (
                                <TouchableOpacity
                                    className={`w-[14.28%] h-10 flex items-center justify-center ${bgColor} rounded-full`}
                                    key={`day-${day}`}
                                    onPress={() => console.log(`${day}.${month + 1}.${year}`)}
                                >
                                    <Text className={`${textColor}`}>{day}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

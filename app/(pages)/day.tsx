
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetEvent } from "@/src/hooks/events.hooks";
import EmotionalWidget from "@/src/components/widgets/EmotionalWidget";
import { Feather } from "@expo/vector-icons";
import { normalizeDate } from "@/src/utils/utils";
import SlidersWidget from "@/src/components/widgets/Day/SlidersWidget";

const monthNames = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];

export default function DayScreen() {
    const { day, month, year } = useLocalSearchParams();
    const router = useRouter();
    const { data: eventData } = useGetEvent(`${year}-${month}-${day}`)
    const today = new Date();
    const currentDate = new Date(Number(year), Number(month) - 1, Number(day));
    const isToday = currentDate.getDate() === today.getDate()
    const isYearAgo = currentDate.getDate() === 1 && today.getMonth() + 1 === currentDate.getMonth()

    const handleNextDay = () => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);

        router.replace({
            pathname: "/(pages)/day",
            params: {
                day: normalizeDate(nextDate.getDate()),
                month: normalizeDate(nextDate.getMonth() + 1),
                year: nextDate.getFullYear().toString(),
            },
        })
    }

    const handlePrevDay = () => {
        const currentDate = new Date(Number(year), Number(month) - 1, Number(day));
        const prevDate = new Date(currentDate);
        prevDate.setDate(currentDate.getDate() - 1);

        router.replace({
            pathname: "/(pages)/day",
            params: {
                day: normalizeDate(prevDate.getDate()),
                month: normalizeDate(prevDate.getMonth() + 1),
                year: prevDate.getFullYear().toString(),
            },
        })
    }

    return (
        <View className="flex-1">
            <ScrollView
                className="flex-1 px-6 pt-20"
                contentContainerStyle={{ paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="w-full flex flex-row items-center justify-between mb-3 px-5">
                    <TouchableOpacity onPress={handlePrevDay} disabled={isYearAgo}>
                        <Feather
                            className={isYearAgo ? "opacity-0" : ""}
                            name="chevron-left"
                            size={28}
                            color="#657D9E"
                        />
                    </TouchableOpacity>
                    <Text className="text-[17px] font-medium text-primary">{day} {monthNames[Number(month) - 1]}</Text>
                    <TouchableOpacity onPress={handleNextDay} disabled={isToday}>
                        <Feather
                            className={isToday ? "opacity-0" : ""}
                            name="chevron-right"
                            size={28}
                            color="#657D9E"
                        />
                    </TouchableOpacity>
                </View>
                <EmotionalWidget
                    widgetDate={`${year}-${month}-${day}`}
                    showText={false}
                    selectedState={eventData?.data?.emotional_state}
                />
                {eventData?.data && <SlidersWidget eventData={eventData.data} />}
            </ScrollView>
        </View>
    );
}

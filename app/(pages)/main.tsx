import CalendarWidget from "@/src/components/widgets/Calendar/CalendarWidget"
import EmotionalWidget from "@/src/components/widgets/EmotionalWidget";
import LeaderboardWidget from "@/src/components/widgets/Leaderboard/LeaderboardWidget";
import StreakWidget from "@/src/components/widgets/StreakWidget";
import { useGetEvent } from "@/src/hooks/events.hooks";
import { useCurrentStreak, useLeaderboard } from "@/src/hooks/users.hooks";
import removeTimezone from "@/src/utils/utils";
import { ScrollView, View } from "react-native";


export default function MainScreen() {
    const { data: todayData, isLoading: isLoadingTodayData } = useGetEvent(removeTimezone(new Date()))
    const { data: streakData, isLoading: isLoadingStreakData } = useCurrentStreak()
    const { data: leaderboardData, isLoading: isLoadingLeaderboardData } = useLeaderboard();
    const streak = streakData?.data.streak_count || 0

    return (
        <View className="flex-1">
            <ScrollView
                className="flex-1 px-6 pt-20"
                contentContainerStyle={{ paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
            >
                <CalendarWidget />
                <EmotionalWidget
                    widgetDate={removeTimezone(new Date())}
                    selectedState={todayData?.data?.emotional_state}
                    isLoading={isLoadingTodayData}
                />
                <StreakWidget
                    streak_count={streak}
                    isLoading={isLoadingStreakData}
                />
                <LeaderboardWidget
                    leaderboardData={leaderboardData?.data}
                    isLoading={isLoadingLeaderboardData}
                />
            </ScrollView>
        </View>
    );
}

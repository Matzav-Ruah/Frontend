import { Octicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import TopElement from "./TopElement";
import { useLeaderboard } from "@/src/hooks/users.hooks";


export default function LeaderboardWidget() {
    const { data: leaderboardData } = useLeaderboard();
    if (!leaderboardData?.success) return null;
    const activeUser = leaderboardData?.data?.activeUser;
    const isUserInLeaderboard = leaderboardData?.data?.users?.some((user) => user.id === activeUser?.id)

    return (
        <View className="rounded-[32px] pl-3 py-2 mb-10 items-center">
            <View className="w-40 h-40 bg-white rounded-[1000px] flex items-center justify-center mx-3 my-3 shadow-lg">
                <Octicons name="trophy" size={80} color="#5a8bff" />
            </View>
            <View className="w-full mt-2">
                {leaderboardData?.data?.users?.map((user, index) => (
                    <TopElement key={index} index={index} user={user} isActiveUser={user.id === activeUser?.id} />
                ))}
                {!isUserInLeaderboard && (
                    <>
                        <View className="flex-row items-center justify-center mx-2 my-3">
                            <View className="flex-1 h-[2px] bg-primary/70" />
                            <Text className="mx-3 text-primary font-medium text-[15px]">
                                твоё место {leaderboardData?.data?.activeUserPosition}
                            </Text>
                            <View className="flex-1 h-[2px] bg-primary/70" />
                        </View>
                        <TopElement key={activeUser?.id} index={3} user={activeUser} isActiveUser={true} />
                    </>
                )}
            </View>
        </View>
    )
}
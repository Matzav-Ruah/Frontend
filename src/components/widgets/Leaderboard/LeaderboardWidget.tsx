import { Octicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import TopElement from "./TopElement";
import { LeaderboardSchema } from "@/src/api/users/users.types";
import Skeleton from "@/src/components/Skeleton";
import { useTheme } from "@/src/contexts/theme-context";


interface LeaderboardWidgetProps {
    leaderboardData: LeaderboardSchema | undefined;
    isLoading?: boolean;
}

export default function LeaderboardWidget({ leaderboardData, isLoading }: LeaderboardWidgetProps) {
    const { colors } = useTheme();
    const activeUser = leaderboardData?.activeUser;
    const isUserInLeaderboard = leaderboardData?.users?.some((user) => user.id === activeUser?.id)

    return (
        <View className="rounded-[32px] pl-3 py-2 mb-10 items-center">
            <View
                className="w-40 h-40 bg-white rounded-[1000px] flex items-center justify-center mx-3 my-3"
                style={{ boxShadow: colors.shadow }}
            >
                <Octicons name="trophy" size={80} color={colors.ind_good} />
            </View>
            <View className="w-full mt-2">
                {isLoading ? (
                    [0, 1, 2].map((i) => (
                        <View key={i} className="mb-2">
                            <Skeleton width="100%" height={56} radius={24} />
                        </View>
                    ))
                ) : (
                    leaderboardData?.users?.map((user, index) => (
                        <TopElement
                            key={index}
                            index={index}
                            user={user}
                            isActiveUser={user.id === activeUser?.id}
                        />
                    ))
                )}
                {!isLoading && !isUserInLeaderboard && leaderboardData && activeUser && (
                    <>
                        <View className="flex-row items-center justify-center mx-2 my-3">
                            <View className="flex-1 h-[2px]" style={{ backgroundColor: colors.primary }} />
                            <Text
                                className="mx-3 font-medium text-[15px]"
                                style={{ color: colors.primary }}
                            >
                                твоё место {leaderboardData?.activeUserPosition}
                            </Text>
                            <View className="flex-1 h-[2px]" style={{ backgroundColor: colors.primary }} />
                        </View>
                        <TopElement key={activeUser?.id} index={3} user={activeUser} isActiveUser={true} />
                    </>
                )}
            </View>
        </View>
    )
}
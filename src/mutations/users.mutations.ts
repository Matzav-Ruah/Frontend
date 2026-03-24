import { useQueryClient } from "@tanstack/react-query";
import {
    useUpdateName,
    useUpdateShowInLeaderboard,
} from "../hooks/users.hooks";
import { LeaderboardSchema, UserSchema } from "../api/users/users.types";
import { ApiResponse } from "../api";

export function useUpdateNameMutation() {
    const queryClient = useQueryClient();
    const { mutate: updateName, isPending } = useUpdateName({
        onMutate: (data) => {
            queryClient.cancelQueries({ queryKey: ["user", "current"] });
            queryClient.cancelQueries({ queryKey: ["user", "leaderboard"] });
            const userPreviousData = queryClient.getQueryData<UserSchema>([
                "user",
                "current",
            ]);
            const leaderboardPreviousData = queryClient.getQueryData<
                ApiResponse<LeaderboardSchema>
            >(["user", "leaderboard"]);
            queryClient.setQueryData(["user", "current"], {
                ...userPreviousData,
                ...data,
            });
            queryClient.setQueryData(["user", "leaderboard"], {
                success: true,
                data: {
                    ...leaderboardPreviousData?.data,
                    activeUser: {
                        ...leaderboardPreviousData?.data.activeUser,
                        ...data,
                    },
                    users: leaderboardPreviousData?.data.users.map((user) => {
                        if (user.id === userPreviousData?.id) {
                            return {
                                ...user,
                                ...data,
                            };
                        }
                        return user;
                    }),
                },
            });
            return { userPreviousData, leaderboardPreviousData };
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user", "current"], data);
        },
        onError: (_, __, context: any) => {
            queryClient.setQueryData(
                ["user", "current"],
                context.userPreviousData,
            );
            queryClient.setQueryData(
                ["user", "leaderboard"],
                context.leaderboardPreviousData,
            );
        },
    });
    return { updateName, isPending };
}

export function useUpdateShowInLeaderboardMutation() {
    const queryClient = useQueryClient();
    const { mutate: updateShowInLeaderboard, isPending } =
        useUpdateShowInLeaderboard({
            onMutate: (data) => {
                queryClient.cancelQueries({ queryKey: ["user", "current"] });
                queryClient.cancelQueries({
                    queryKey: ["user", "leaderboard"],
                });
                const userPreviousData = queryClient.getQueryData<UserSchema>([
                    "user",
                    "current",
                ]);
                const leaderboardPreviousData = queryClient.getQueryData<
                    ApiResponse<LeaderboardSchema>
                >(["user", "leaderboard"]);
                queryClient.setQueryData(["user", "current"], {
                    ...userPreviousData,
                    ...data,
                });
                if (!data.in_leaderboard) {
                    queryClient.setQueryData(["user", "leaderboard"], {
                        ...leaderboardPreviousData,
                        data: {
                            ...leaderboardPreviousData?.data,
                            users: leaderboardPreviousData?.data?.users?.filter(
                                (user) =>
                                    user.id !== userPreviousData?.id
                                        ? user
                                        : {},
                            ),
                        },
                    });
                }
                return { userPreviousData, leaderboardPreviousData };
            },
            onSuccess: (data) => {
                queryClient.setQueryData(["user", "current"], data);
                queryClient.invalidateQueries({
                    queryKey: ["user", "leaderboard"],
                });
            },
            onError: (_, __, context: any) => {
                queryClient.setQueryData(
                    ["user", "current"],
                    context.userPreviousData,
                );
                queryClient.setQueryData(
                    ["user", "leaderboard"],
                    context.leaderboardPreviousData,
                );
            },
        });
    return { updateShowInLeaderboard, isPending };
}

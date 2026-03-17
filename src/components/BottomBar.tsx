import { TouchableOpacity, View, Text } from "react-native";
import { usePathname, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../contexts/theme-context";

type TabItem = {
    name: string;
    icon: keyof typeof Feather.glyphMap;
    label: string;
    route: '/(pages)/stats' | '/(pages)/main' | '/(pages)/profile';
};

const tabs: TabItem[] = [
    { name: 'stats', icon: 'pie-chart', label: 'Статистика', route: '/(pages)/stats' },
    { name: 'main', icon: 'calendar', label: 'Главная', route: '/(pages)/main' },
    { name: 'profile', icon: 'user', label: 'Профиль', route: '/(pages)/profile' },
];

export default function BottomBar() {
    const router = useRouter();
    const { colors } = useTheme();
    const pathname = usePathname();
    const activeTab = pathname.includes('day') ? 'main' : pathname.slice(1);
    return (
        <View
            className="absolute bottom-10 left-6 right-6 bg-white rounded-full flex-row items-center justify-between px-6 py-3"
            style={{ boxShadow: colors.shadow }}
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab.name;

                if (isActive) {
                    return (
                        <TouchableOpacity
                            key={tab.name}
                            activeOpacity={0.7}
                            className="flex-row items-center rounded-full px-5 py-3"
                            style={{ backgroundColor: colors.interface }}
                            onPress={() => router.push(tab.route)}
                        >
                            <Feather name={tab.icon} size={20} color="white" />
                            <Text className="text-white font-medium ml-2">
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                }

                return (
                    <TouchableOpacity
                        key={tab.name}
                        activeOpacity={0.7}
                        className="p-2"
                        onPress={() => router.push(tab.route)}
                    >
                        <Feather name={tab.icon} size={24} color={colors.primary} />
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}
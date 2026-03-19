import { useTheme, useThemeDispatch } from '@/src/contexts/theme-context';
import { ThemeName } from '@/src/theme/colors';
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const themesList: { name: ThemeName, title: string }[] = [
    { name: "white", "title": "Белый" },
    { name: "blue", "title": "Голубой" },
]

export default function ThemesScreen() {
    const { name, colors } = useTheme();
    const changeTheme = useThemeDispatch();

    return (
        <View className="flex-1">
            <ScrollView
                className="flex-1 px-6 pt-20"
                contentContainerStyle={{ paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 items-center justify-center">
                    <Text
                        className="text-2xl font-medium mb-5"
                        style={{ color: colors.primary }}
                    >
                        Выбери цветовую схему
                    </Text>
                    {themesList.map((theme) => {
                        const isCurrentTheme = theme.name === name;
                        return (
                            <TouchableOpacity
                                key={theme.name}
                                onPress={() => changeTheme(theme.name)}
                                className={`w-full rounded-3xl py-5 mb-4 ${isCurrentTheme ? "bg-gray-300 border-2 border-gray-400/20" : "bg-white"}`}
                                style={isCurrentTheme ? undefined : { boxShadow: colors.shadow }}
                            >
                                <View
                                    className="flex-row items-center justify-center gap-3"
                                >
                                    {isCurrentTheme && <Feather name="chevron-right" size={20} color={colors.primary} />}
                                    <Text
                                        numberOfLines={1}
                                        className="font-medium text-lg"
                                        style={{ color: colors.primary }}
                                    >{theme.title}</Text>
                                    {isCurrentTheme && <Feather name="chevron-left" size={20} color={colors.primary} />}
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    );
}
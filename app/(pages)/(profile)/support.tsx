import React from 'react';
import { Text, View, ScrollView, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MenuElement from '@/src/components/MenuElement';
import { useTheme } from '@/src/contexts/theme-context';

type MenuItemProps = {
    iconName: keyof typeof Feather.glyphMap;
    title: string;
    onPress: () => void;
};


export default function SupportScreen() {
    const { colors } = useTheme();

    const handleEmailPress = () => {
        const email = process.env.EXPO_PUBLIC_SUPPORT_EMAIL_ADDRESS;
        const url = `mailto:${email}?subject=${encodeURIComponent("MatzavRuah - Support")}`;
        Linking.openURL(url);
    };

    const handleTelegramPress = async () => {
        const username = process.env.EXPO_PUBLIC_SUPPORT_TELEGRAM_USERNAME
        const url = `tg://resolve?domain=${username}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            await Linking.openURL(`https://t.me/${username}`);
        }
    }

    const handleGithubPress = () => {
        const url = "https://github.com/Matzav-Ruah/Frontend/issues/new";
        Linking.openURL(url);
    }

    const menuItems: MenuItemProps[] = [
        { iconName: 'mail', title: 'Отправить email', onPress: handleEmailPress },
        { iconName: 'message-circle', title: 'Написать в Telegram', onPress: handleTelegramPress },
        { iconName: 'github', title: 'Создать GitHub Issue', onPress: handleGithubPress },
    ];

    return (
        <ScrollView className='px-5 pt-[70px]'>
            <View className="space-y-4 items-center">
                <Text
                    className="text-2xl font-medium mb-5"
                    style={{ color: colors.primary }}
                >
                    Выбери способ связи
                </Text>
                <View className="w-full">
                    {menuItems.map((item, index) => (
                        <MenuElement
                            key={index}
                            iconLeft={item.iconName}
                            title={item.title}
                            iconRight="chevron-right"
                            onPress={item.onPress}
                        />
                    ))}
                </View>
            </View>
        </ScrollView >
    );
}
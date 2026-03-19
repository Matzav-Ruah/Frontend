import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/src/contexts/auth-context';
import MenuElement from '@/src/components/MenuElement';
import { Redirect, useRouter, Href } from 'expo-router';
import { useTheme } from '@/src/contexts/theme-context';

type MenuItemProps = {
    iconName: keyof typeof Feather.glyphMap;
    title: string;
    route: Href;
};

const menuItems: MenuItemProps[] = [
    { iconName: 'bell', title: 'Уведомления', route: '/(pages)/(profile)/notifications' },
    { iconName: 'sun', title: 'Оформление', route: '/(pages)/(profile)/theme' },
    { iconName: 'headphones', title: 'Поддержка', route: '/(pages)/(profile)/support' },
];

export default function ProfileScreen() {
    const { user, logout, isAuthenticated } = useAuth();
    const router = useRouter();
    const { colors } = useTheme();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <ScrollView className='px-5 pt-[70px]'>
            <TouchableOpacity onPress={() => router.push('/(pages)/(profile)/account')}>
                <View className="flex-row items-center bg-white rounded-3xl p-5 mb-5 justify-between" style={{ boxShadow: colors.shadow }}>
                    <View className="flex-row items-center">
                        <View className="h-14 w-14 rounded-full border-2 items-center justify-center" style={{ borderColor: colors.interface }}>
                            <Feather name="user" size={24} color={colors.interface} />
                        </View>
                        <Text className="text-xl font-semibold ml-4" style={{ color: colors.interface }}>
                            {user?.first_name} {user?.last_name}
                        </Text>
                    </View>
                    <Feather name="chevron-right" size={20} color={colors.interface} />
                </View>
            </TouchableOpacity>
            <View className="space-y-4">
                {menuItems.map((item, index) => (
                    <MenuElement
                        key={index}
                        iconLeft={item.iconName}
                        title={item.title}
                        iconRight="chevron-right"
                        onPress={() => router.push(item.route)}
                    />))}
                <View className="h-1" />
                <MenuElement
                    key={menuItems.length}
                    title="Выйти"
                    iconRight="log-out"
                    onPress={handleLogout}
                    textStyle='text-red-500'
                    iconRightColor='red'
                />
            </View>
        </ScrollView >
    );
}
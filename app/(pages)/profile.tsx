import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/src/contexts/auth-context';
import MenuElement from '@/src/components/MenuElement';
import { Redirect } from 'expo-router';

type MenuItemProps = {
    iconName: keyof typeof Feather.glyphMap;
    title: string;
    isDestructive?: boolean;
};

const menuItems: MenuItemProps[] = [
    { iconName: 'file-text', title: 'Личные данные' },
    { iconName: 'bell', title: 'Уведомления' },
    { iconName: 'sun', title: 'Оформление' },
    { iconName: 'headphones', title: 'Поддержка' },
];

export default function ProfileScreen() {
    const { user, logout, isAuthenticated } = useAuth();

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
            <View className="flex-row items-center bg-white rounded-3xl p-5 mb-5 shadow-sm">
                <View className="h-14 w-14 rounded-full border-2 border-blue-400 items-center justify-center">
                    <Feather name="user" size={24} color="#60a5fa" />
                </View>
                <Text className="text-xl text-blue-500 font-semibold ml-4">
                    {user?.first_name} {user?.last_name}
                </Text>
            </View>
            <View className="space-y-4">
                {menuItems.map((item, index) => (
                    <MenuElement
                        key={index}
                        iconLeft={item.iconName}
                        title={item.title}
                        iconRight="chevron-right"
                    />))}
                <MenuElement
                    key={menuItems.length}
                    title="Выйти"
                    iconRight="log-out"
                    onPress={handleLogout}
                    textStyle='text-red-500'
                    iconRightColor='red'
                />
            </View>
        </ScrollView>
    );
}
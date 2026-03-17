import { useTheme, useThemeDispatch } from '@/src/contexts/theme-context';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ThemesScreen() {
    const { name, colors } = useTheme();
    const changeTheme = useThemeDispatch();

    return (
        <View className='mt-20'>
            <Text
                className='text-2xl font-bold mb-5'
                style={{ color: colors.primary }}
            >Theme now: {name}</Text>
            <TouchableOpacity
                className='w-full bg-white p-5 mb-5'
                style={{ boxShadow: colors.shadow }}
                onPress={() => changeTheme('white')}>
                <Text>White</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeTheme('blue')}
                className='w-full bg-blue-500 p-5 mb-5'
                style={{ boxShadow: colors.shadow }}>
                <Text>Blue</Text>
            </TouchableOpacity>
        </View>
    )
}
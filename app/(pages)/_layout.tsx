import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import BottomBar from '@/src/components/BottomBar';
import { useTheme } from '@/src/contexts/theme-context';

export default function PagesLayout() {
    const { colors } = useTheme();
    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.background }}>
            <Slot />
            <BottomBar />
        </View>
    );
}

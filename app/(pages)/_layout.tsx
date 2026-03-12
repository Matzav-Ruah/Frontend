import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import BottomBar from '@/src/components/BottomBar';

export default function PagesLayout() {
    return (
        <View className="flex-1 bg-[#D8E2EC]">
            <Slot />
            <BottomBar />
        </View>
    );
}

import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../contexts/theme-context';

interface SwitchProps {
    isOn: boolean;
    onToggle: (value: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ isOn, onToggle }) => {
    const { colors } = useTheme();
    return (
        <Pressable
            onPress={() => onToggle(!isOn)}
            accessibilityRole="switch"
            accessibilityState={{ checked: isOn }}
        >
            <View
                className={`w-[42px] h-[25px] rounded-xl p-[3px] flex-row items-center ${isOn ? 'justify-end' : 'justify-start'}`}
                style={{ backgroundColor: isOn ? colors.ind_good : colors.interface }}
            >
                <View
                    className="w-[20px] h-[20px] bg-white rounded-full"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 2,
                    }}
                />
            </View>
        </Pressable>
    );
};
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, ThemeName, ThemeColors } from '../theme/colors';

const ThemeStateContext = createContext<{ name: ThemeName; colors: ThemeColors } | undefined>(undefined);
const ThemeDispatchContext = createContext<((name: ThemeName) => void) | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [themeName, setThemeName] = useState<ThemeName>('white');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme && Object.keys(themes).includes(savedTheme)) {
                    setThemeName(savedTheme as ThemeName);
                }
            } catch (e) {
                console.error('Failed to load theme', e);
            }
        };
        loadTheme();
    }, []);

    const changeTheme = useCallback(async (name: ThemeName) => {
        setThemeName(name);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, name);
        } catch (e) {
            console.error('Failed to save theme', e);
        }
    }, []);

    const stateValue = useMemo(() => ({
        name: themeName,
        colors: themes[themeName]
    }), [themeName]);

    return (
        <ThemeDispatchContext.Provider value={changeTheme}>
            <ThemeStateContext.Provider value={stateValue}>
                {children}
            </ThemeStateContext.Provider>
        </ThemeDispatchContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeStateContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const useThemeDispatch = () => {
    const context = useContext(ThemeDispatchContext);
    if (context === undefined) {
        throw new Error('useThemeDispatch must be used within a ThemeProvider');
    }
    return context;
};
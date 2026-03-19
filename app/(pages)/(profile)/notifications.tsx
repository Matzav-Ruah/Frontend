import { Switch } from "@/src/components/Switch";
import { useTheme } from "@/src/contexts/theme-context";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { DEFAULT_TIME, ReminderSettings, STORAGE_KEY, requestPermissions, saveSettings, scheduleReminder } from "@/src/utils/notifications";

export default function SupportScreen() {
    const { colors } = useTheme();
    const [notifications, setNotifications] = useState(false);
    const [time, setTime] = useState(DEFAULT_TIME);
    const [notificationId, setNotificationId] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const isValidTime = useMemo(() => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), [time]);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                if (!raw) {
                    setIsLoaded(true);
                    return;
                }

                const parsed = JSON.parse(raw) as ReminderSettings;
                setNotifications(Boolean(parsed.enabled));
                setTime(parsed.time || DEFAULT_TIME);
                setNotificationId(parsed.notificationId ?? null);
            } catch {
                setTime(DEFAULT_TIME);
            } finally {
                setIsLoaded(true);
            }
        };

        loadSettings();
    }, []);

    const onToggle = async () => {
        if (!isLoaded) return;

        if (!notifications) {
            if (!isValidTime) {
                Alert.alert("Некорректное время", "Введите время в формате HH:MM.");
                return;
            }

            const granted = await requestPermissions();
            if (!granted) {
                Alert.alert("Нет доступа", "Разрешите уведомления в настройках устройства.");
                return;
            }

            const id = await scheduleReminder(time, notificationId);
            setNotificationId(id);
            setNotifications(true);
            await saveSettings({ enabled: true, time, notificationId: id });
            return;
        }

        if (notificationId) {
            await Notifications.cancelScheduledNotificationAsync(notificationId);
        }
        setNotifications(false);
        setNotificationId(null);
        await saveSettings({ enabled: false, time, notificationId: null });
    };

    const onTimeChange = async (value: string) => {
        setTime(value);
        if (!isLoaded) return;

        if (!notifications) {
            await saveSettings({ enabled: false, time: value, notificationId: null });
            return;
        }

        if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
            return;
        }

        const id = await scheduleReminder(value, notificationId);
        setNotificationId(id);
        await saveSettings({ enabled: true, time: value, notificationId: id });
    };

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
                        Уведомления
                    </Text>
                </View>
                <View
                    className={`flex-row items-center justify-between bg-white rounded-3xl px-5 py-5 mb-3`}
                    style={{ boxShadow: colors.shadow }}
                >
                    <View className="flex-row items-center">
                        <Feather name="bell" size={22} color={colors.primary} className="mr-4" />
                        <Text
                            className={`text-[16px] font-medium`}
                            style={{ color: colors.primary }}
                        >
                            Напоминания
                        </Text>
                    </View>
                    <Switch isOn={notifications} onToggle={onToggle} />
                </View>
                <View
                    className={`bg-white rounded-3xl px-5 py-5`}
                    style={{ boxShadow: colors.shadow }}
                >
                    <Text className="text-[14px] mb-2" style={{ color: colors.primary }}>
                        Время напоминания (HH:MM)
                    </Text>
                    <TextInput
                        value={time}
                        onChangeText={onTimeChange}
                        keyboardType="numbers-and-punctuation"
                        maxLength={5}
                        placeholder="20:00"
                        placeholderTextColor={colors.interface}
                        className="border rounded-2xl px-4 py-3 text-[16px]"
                        style={{ color: colors.primary, borderColor: colors.secondary }}
                    />
                    {!isValidTime && (
                        <Text className="text-xs mt-2" style={{ color: colors.ind_bad }}>
                            Формат времени: HH:MM
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}
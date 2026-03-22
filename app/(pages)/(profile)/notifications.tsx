import { Switch } from "@/src/components/Switch";
import { useTheme } from "@/src/contexts/theme-context";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import {
    ReminderSettings,
    STORAGE_KEY,
    requestPermissions,
    saveSettings,
    scheduleReminder,
} from "@/src/utils/notifications";
import RNDateTimePicker, {
    DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";

export default function SupportScreen() {
    const { colors } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [reminderHour, setReminderHour] = useState<number>(20);
    const [reminderMinute, setReminderMinute] = useState<number>(0);
    const [notificationId, setNotificationId] = useState<string | null>(null);
    const [playSound, setPlaySound] = useState<boolean>(true);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                if (!raw) return;

                const parsed = JSON.parse(raw) as ReminderSettings;
                setShowNotifications(Boolean(parsed.enabled));
                setReminderHour(parsed.reminderHour ?? 20);
                setReminderMinute(parsed.reminderMinute ?? 0);
                setNotificationId(parsed.notificationId ?? null);
                setPlaySound(parsed.playSound ?? true);
            } catch {
                setReminderHour(20);
                setReminderMinute(0);
            }
        };

        loadSettings();
    }, []);

    const onToggle = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        if (!showNotifications) {
            const granted = await requestPermissions();
            if (!granted) {
                Alert.alert(
                    "Нет доступа",
                    "Разрешите уведомления в настройках устройства.",
                );
                return;
            }

            const id = await scheduleReminder(
                reminderHour,
                reminderMinute,
                notificationId,
                playSound,
            );
            setNotificationId(id);
            setShowNotifications(true);
            await saveSettings({
                enabled: true,
                reminderHour,
                reminderMinute,
                notificationId: id,
                playSound,
            });
            return;
        }

        if (notificationId) {
            await Notifications.cancelScheduledNotificationAsync(
                notificationId,
            );
        }
        setShowNotifications(false);
        setNotificationId(null);
        await saveSettings({
            enabled: false,
            reminderHour,
            reminderMinute,
            notificationId: null,
            playSound,
        });
    };

    const onSoundToggle = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        setPlaySound(!playSound);
        if (showNotifications) {
            const id = await scheduleReminder(
                reminderHour,
                reminderMinute,
                notificationId,
                !playSound,
            );
            setNotificationId(id);
            await saveSettings({
                enabled: true,
                reminderHour,
                reminderMinute,
                notificationId: id,
                playSound: !playSound,
            });
        }
    };

    const onTimeChange = async (
        _: DateTimePickerChangeEvent,
        selectedDate: Date,
    ) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        setShowPicker(false);

        const newHour = selectedDate.getHours();
        const newMinute = selectedDate.getMinutes();

        setReminderHour(newHour);
        setReminderMinute(newMinute);

        if (showNotifications) {
            const id = await scheduleReminder(
                newHour,
                newMinute,
                notificationId,
                playSound,
            );
            setNotificationId(id);
            await saveSettings({
                enabled: true,
                reminderHour: newHour,
                reminderMinute: newMinute,
                notificationId: id,
                playSound,
            });
        }
    };

    return (
        <View className="flex-1">
            <ScrollView
                className="flex-1 px-6 pt-20"
                contentContainerStyle={{ paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="items-center justify-center mb-5">
                    <Text
                        className="text-2xl font-medium"
                        style={{ color: colors.primary }}
                    >
                        Уведомления
                    </Text>
                </View>
                <View
                    className={`flex-row items-center justify-between bg-white rounded-3xl px-5 py-5 mb-3`}
                    style={{ boxShadow: colors.shadow }}
                >
                    <View className="flex-1">
                        <View className="flex-row justify-between items-center mb-1">
                            <View className="flex-row items-center">
                                <Feather
                                    name="bell"
                                    size={20}
                                    color={colors.primary}
                                    style={{ marginRight: 8 }}
                                />
                                <Text
                                    className="text-[17px] font-semibold"
                                    style={{ color: colors.primary }}
                                >
                                    Напоминания
                                </Text>
                            </View>
                            <Switch
                                isOn={showNotifications}
                                onToggle={onToggle}
                            />
                        </View>

                        {showNotifications && (
                            <View className="flex-row items-center mt-1">
                                <Text
                                    className="text-[14px] opacity-70 mr-2"
                                    style={{ color: colors.primary }}
                                >
                                    {reminderHour >= 18
                                        ? "Каждый вечер в"
                                        : reminderHour >= 12
                                          ? "Каждый день в"
                                          : "Каждое утро в"}
                                </Text>
                                <Pressable onPress={() => setShowPicker(true)}>
                                    <TextInput
                                        value={`${reminderHour.toString().padStart(2, "0")}:${reminderMinute.toString().padStart(2, "0")}`}
                                        editable={false}
                                        className="border rounded-lg px-2 py-0.5 text-[14px] font-medium"
                                        style={{
                                            color: colors.primary,
                                            borderColor: colors.secondary,
                                            backgroundColor: "#f9f9f9",
                                        }}
                                    />
                                </Pressable>

                                {showPicker && (
                                    <RNDateTimePicker
                                        mode="time"
                                        display="default"
                                        value={(() => {
                                            const d = new Date();
                                            d.setHours(reminderHour);
                                            d.setMinutes(reminderMinute);
                                            return d;
                                        })()}
                                        onValueChange={onTimeChange}
                                    />
                                )}
                            </View>
                        )}
                    </View>
                </View>
                {showNotifications && (
                    <View
                        className={`flex-row items-center justify-between bg-white rounded-3xl px-5 py-5 mb-3`}
                        style={{ boxShadow: colors.shadow }}
                    >
                        <View className="flex-row items-center">
                            <Feather
                                name="music"
                                size={20}
                                color={colors.primary}
                                style={{ marginRight: 8 }}
                            />
                            <Text
                                className="text-[17px] font-semibold"
                                style={{ color: colors.primary }}
                            >
                                Звук
                            </Text>
                        </View>
                        <Switch isOn={playSound} onToggle={onSoundToggle} />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

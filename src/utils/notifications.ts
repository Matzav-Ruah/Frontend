import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export type ReminderSettings = {
    enabled: boolean;
    time: string;
    notificationId: string | null;
};

export const STORAGE_KEY = "notifications:reminder-settings";
export const DEFAULT_TIME = "20:00";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export const requestPermissions = async () => {
    const settings = await Notifications.getPermissionsAsync();
    if (settings.granted) return true;

    const requested = await Notifications.requestPermissionsAsync();
    return requested.granted;
};

export const saveSettings = async (settings: ReminderSettings) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const scheduleReminder = async (timeValue: string, previousId?: string | null) => {
    if (previousId) {
        await Notifications.cancelScheduledNotificationAsync(previousId);
    }

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("daily-reminders", {
            name: "Daily reminders",
            importance: Notifications.AndroidImportance.HIGH,
        });
    }

    const [hour, minute] = timeValue.split(":").map(Number);
    const trigger: Notifications.NotificationTriggerInput =
        Platform.OS === "android"
            ? ({
                type: Notifications.SchedulableTriggerInputTypes.DAILY,
                hour,
                minute,
            } as Notifications.DailyTriggerInput)
            : ({
                type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
                hour,
                minute,
                repeats: true,
            } as Notifications.CalendarTriggerInput);

    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: "Напоминание",
            body: "Зайдите в приложение и отметьте ваш день.",
            sound: true,
        },
        trigger,
    });

    return id;
};

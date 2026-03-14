import CalendarWidget from "@/src/components/widgets/Calendar/CalendarWidget";
import { ScrollView, View } from "react-native";


export default function MainScreen() {
    return (
        <View className="flex-1">
            <ScrollView
                className="flex-1 px-6 pt-20"
                contentContainerStyle={{ paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
            >
                <CalendarWidget />
            </ScrollView>
        </View>
    );
}

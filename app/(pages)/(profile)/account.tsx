import { View, ScrollView, TextInput, Pressable, Keyboard } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/src/contexts/theme-context";
import MenuElement from "@/src/components/MenuElement";
import { useState, useRef, useEffect } from "react";
import { useUpdateNameMutation } from "@/src/mutations/users.mutations";
import { useCurrentUser } from "@/src/hooks/users.hooks";

export default function AccountScreen() {
    const { colors } = useTheme();
    const { data: user } = useCurrentUser();
    const { updateName } = useUpdateNameMutation();

    const originalName =
        `${user?.first_name || ""} ${user?.last_name || ""}`.trim();
    const [inputValue, setInputValue] = useState(originalName);
    const [isEditingName, setIsEditingName] = useState(false);

    const inputRef = useRef<TextInput>(null);
    const isSaving = useRef(false);

    useEffect(() => {
        if (!isEditingName) {
            setInputValue(
                `${user?.first_name || ""} ${user?.last_name || ""}`.trim(),
            );
        }
    }, [user, isEditingName]);

    const handleStartEditing = () => {
        setIsEditingName(true);
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const handleCancel = () => {
        setInputValue(originalName);
        setIsEditingName(false);
    };

    const handleSave = () => {
        updateName({
            first_name: inputValue.split(" ")[0],
            last_name: inputValue.split(" ")[1],
        });

        isSaving.current = true;
        setIsEditingName(false);
        Keyboard.dismiss();
        isSaving.current = false;
    };

    return (
        <ScrollView
            className="px-5 pt-[70px]"
            keyboardShouldPersistTaps="handled"
        >
            <View className="space-y-4 items-center">
                <View className="w-full items-center">
                    <Feather
                        name="user"
                        size={40}
                        color={colors.interface}
                        className="rounded-full border-[3px] p-3 mb-[-17px]"
                        style={{ borderColor: colors.interface }}
                    />
                </View>

                <View className="w-full mb-3">
                    <Pressable
                        className="bg-white rounded-3xl justify-center overflow-hidden py-2"
                        style={{ boxShadow: colors.shadow }}
                        onPress={() => {
                            if (!isEditingName) handleStartEditing();
                        }}
                    >
                        <TextInput
                            ref={inputRef}
                            className="text-[16px] font-medium text-center"
                            style={{ color: colors.primary }}
                            value={inputValue}
                            onChangeText={setInputValue}
                            editable={isEditingName}
                            returnKeyType="done"
                            onSubmitEditing={handleSave}
                            onBlur={() => {
                                if (!isSaving.current) handleCancel();
                            }}
                            pointerEvents={isEditingName ? "auto" : "none"}
                        />
                        <View className="absolute right-0 top-0 bottom-0 justify-center items-center">
                            <Pressable
                                className="p-2 mr-2"
                                onPressIn={() => {
                                    isSaving.current = true;
                                }}
                                onPress={handleSave}
                            >
                                <Feather
                                    className={isEditingName ? "" : "opacity-0"}
                                    name="check"
                                    size={22}
                                    color={
                                        inputValue !== originalName
                                            ? colors.primary
                                            : "gray"
                                    }
                                />
                            </Pressable>
                        </View>
                    </Pressable>
                </View>
                <View className="w-full opacity-60">
                    <MenuElement
                        iconLeft="mail"
                        title="Сменить почту"
                        iconRight="chevron-right"
                        onPress={() => {}}
                    />
                    <MenuElement
                        iconLeft="lock"
                        title="Сменить пароль"
                        iconRight="chevron-right"
                        onPress={() => {}}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

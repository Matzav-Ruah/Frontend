import { useAuth } from "@/src/contexts/auth-context";
import { useTheme } from "@/src/contexts/theme-context";
import { Feather } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type AuthMode = "login" | "register";

export default function LoginScreen() {
    const { login, register, isAuthenticated } = useAuth();
    const { colors } = useTheme();
    const [mode, setMode] = useState<AuthMode>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = useCallback(async () => {
        const trimmed = email.trim();
        if (!trimmed) return setError("Введи email");
        if (!password) return setError("Введи пароль");
        if (mode === "register") {
            if (password !== passwordRepeat)
                return setError("Пароли не совпадают");
            if (password.length < 6)
                return setError("Пароль должен быть не менее 6 символов");
            if (!/[0-9]/.test(password))
                return setError("Пароль должен содержать хотя бы одну цифру");
            if (!/[^a-zA-Z0-9]/.test(password))
                return setError(
                    "Пароль должен содержать хотя бы один специальный символ",
                );
        }
        setError("");
        setSubmitting(true);
        if (mode === "login") {
            const login_data = await login({ email: trimmed, password });
            if (login_data.message === "Invalid credentials") {
                setError("Почта или пароль неверны");
            }
        } else {
            const reg_data = await register({ email: trimmed, password });
            if (!reg_data.message) return setError("Неизвестная ошибка");
            if (
                reg_data.message.startsWith(
                    "An account with this email already exists",
                )
            ) {
                setError("Пользователь с таким email уже существует");
            } else if (
                reg_data.message.startsWith("User registered successfully")
            ) {
                setError("");
                await login({ email: trimmed, password });
            } else {
                setError(reg_data.message);
            }
        }

        setSubmitting(false);
    }, [email, password, login, register, mode, passwordRepeat]);

    if (isAuthenticated) return <Redirect href="/" />;

    return (
        <ScrollView className="flex-1 ph-24 py-48 mx-7">
            <View
                className="bg-white rounded-[28px] px-6 py-10"
                style={{ boxShadow: colors.shadow }}
            >
                <Text
                    className="text-center text-[26px] font-semibold mb-4"
                    style={{ color: colors.primary }}
                >
                    Авторизация
                </Text>

                <View
                    className="flex-row items-center rounded-full justify-center gap-1 mb-7 py-1"
                    style={{ backgroundColor: colors.interface }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setError("");
                            setMode("login");
                        }}
                        className="px-10 py-2.5 rounded-full"
                        style={{
                            backgroundColor:
                                mode === "login" ? "#FFFFFF" : "transparent",
                        }}
                    >
                        <Text
                            className="text-[15px] font-medium"
                            style={{
                                color:
                                    mode === "login"
                                        ? colors.primary
                                        : "#FFFFFF",
                            }}
                        >
                            Вход
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setError("");
                            setMode("register");
                        }}
                        className="px-6 py-2.5 rounded-full"
                        style={{
                            backgroundColor:
                                mode === "register"
                                    ? "#FFFFFF"
                                    : colors.interface,
                        }}
                    >
                        <Text
                            className="text-[15px] font-medium"
                            style={{
                                color:
                                    mode === "register"
                                        ? colors.primary
                                        : "#FFFFFF",
                            }}
                        >
                            Регистрация
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    className="mb-4 z-10 rounded-2xl p-3"
                    style={{ backgroundColor: colors.background }}
                >
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        placeholderTextColor={colors.primary}
                        className="text-[16px] py-1 px-0 z-20"
                        placeholder="Email адрес"
                    />
                </View>

                <View
                    className="mb-3 z-10 rounded-2xl p-3"
                    style={{ backgroundColor: colors.background }}
                >
                    <View className="flex-row items-center">
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            placeholderTextColor={colors.primary}
                            className="text-[16px] flex-1 py-1 px-0 pr-2 z-20"
                            placeholder="Пароль"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword((prev) => !prev)}
                            hitSlop={12}
                        >
                            <Feather
                                name={showPassword ? "eye" : "eye-off"}
                                size={20}
                                color={colors.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {mode === "register" && (
                    <View
                        className="mb-3 mt-1 z-10 rounded-2xl p-3"
                        style={{ backgroundColor: colors.background }}
                    >
                        <View className="flex-row items-center">
                            <TextInput
                                value={passwordRepeat}
                                onChangeText={setPasswordRepeat}
                                secureTextEntry={true}
                                placeholderTextColor={colors.primary}
                                className="text-[16px] flex-1 py-1 px-0 pr-2 z-20"
                                placeholder="Повтори пароль"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword((prev) => !prev)}
                                hitSlop={12}
                                className="pb-1"
                            />
                        </View>
                    </View>
                )}
                {error && (
                    <Text className="font-medium text-red-500">{error}</Text>
                )}
                <TouchableOpacity
                    className="rounded-full mt-4 py-4 items-center justify-center"
                    style={{ backgroundColor: colors.ind_good }}
                    activeOpacity={0.85}
                    onPress={onSubmit}
                    disabled={submitting}
                >
                    {submitting ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text className="text-[16px] font-semibold text-white">
                            {mode === "login" ? "Войти" : "Зарегистрироваться"}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

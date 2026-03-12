import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/auth-context';
import { Redirect } from 'expo-router';

export default function LoginScreen() {
    const { login, isAuthenticated, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (isLoading) {
        return (<View><ActivityIndicator size="large" color="#000" /></View>);
    }
    if (isAuthenticated) return <Redirect href="/" />;

    const handleLogin = async () => {
        try {
            setError('');
            await login({ email, password });
        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <View>
            <Text>Login</Text>

            {error ? <Text>{error}</Text> : null}

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#999"
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
            />

            <TouchableOpacity onPress={handleLogin}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

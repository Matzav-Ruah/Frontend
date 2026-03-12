import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/auth-context';
import { Button, View, Text } from 'react-native';

export default function Index() {
    const { isAuthenticated, isLoading, logout } = useAuth();

    if (isLoading) return null;
    if (isAuthenticated) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Text>Welcome back! You are logged in.</Text>
            <Button onPress={async () => await logout()} title="Logout" />
        </View>
    );

    return <Redirect href="/(auth)/login" />;
}

import { Redirect } from 'expo-router';
import { useAuth } from '@/src/contexts/auth-context';

export default function Index() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;
    if (isAuthenticated) return <Redirect href="/(pages)/main" />;

    return <Redirect href="/(auth)/login" />;
}

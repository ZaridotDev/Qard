import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AnalyticsScreen } from '../ui/screens/AnaliticsStack/AnalyticsScreen';
import { SessionScreen } from '../ui/screens/SessionStack/SessionScreen';
import { HomeStack } from './HomeStack';
import { AuthScreen } from '../ui/screens/SessionStack/AuthScreen';
import { useAuth } from '../hooks/useAuth';

const Drawer = createDrawerNavigator();

export function HamburgerMenu() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) return <AuthScreen />;
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false,  }}>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="Analytics" component={AnalyticsScreen} />
      <Drawer.Screen name="Session" component={SessionScreen} />
    </Drawer.Navigator>
  );
}
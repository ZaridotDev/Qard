import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AnalyticsScreen } from '../ui/screens/AnaliticsStack/AnalyticsScreen';
import { SessionScreen } from '../ui/screens/SessionStack/SessionScreen';
import { HomeStack } from './HomeStack';
import { AuthScreen } from '../ui/screens/SessionStack/AuthScreen';
import { useAuth } from '../hooks/useAuth';
import { UserRound } from 'lucide-react-native';
import { colors } from '../ui/styles/colors';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();

export function HamburgerMenu() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) return <AuthScreen />;
  return (
    <Drawer.Navigator 
      initialRouteName="HomeStack"
      screenOptions={{ 
        headerShown: false,  
        drawerStyle: {
          backgroundColor: colors[3],
          width: 280
        },
        drawerLabelStyle:{
          fontSize: 16,
          color: '#333',
        },
        drawerActiveBackgroundColor: colors[5]
      }}
    >
      <Drawer.Screen 
        name="Session" 
        component={SessionScreen} 
        options={{ 
          title: 'Configuración',
          drawerIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? colors[2] : colors[1],
                borderRadius: 50,
                padding: 5
                }}
            >
              <UserRound size={42} color={focused ? colors[6] : colors[4]} />
            </View>
          ),
        }}
      />
      <Drawer.Screen name="HomeStack" component={HomeStack} options={{ title: 'Página principal'}}/>
      <Drawer.Screen name="Analytics" component={AnalyticsScreen} options={{ title: 'Estadísticas'}}/>
    </Drawer.Navigator>
  );
}
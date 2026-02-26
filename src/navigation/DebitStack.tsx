import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WalletsStack } from './DebitStack/WalletsStack';
import { HistoryStack } from './DebitStack/HistoryStack';
import { RecurrentEgressScreen } from '../ui/screens/HomeStack/DebitStack/RecurrentEgressScreen';
import { Wallet, History, CalendarArrowDown } from 'lucide-react-native';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


const Tab = createBottomTabNavigator();

export function DebitStack() {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarInactiveBackgroundColor: '#ECF4E4', 
        tabBarActiveBackgroundColor: '#D9E7CB', 
        tabBarLabelStyle: {color: '#334225', display: 'none'},
        tabBarIconStyle: {flex: 1},
        tabBarStyle: {height: 100, alignItems: 'center'},
      }}
    >
      <Tab.Screen name="Wallets" component={WalletsStack} options={{ headerShown: false, title: 'CATEGORIAS', tabBarIcon: () => <Wallet color={'#334225'} size={40}/>}} />
      <Tab.Screen name="History" component={HistoryStack} options={{ headerShown: false, title: 'HISTORIAL', tabBarIcon: () => <History color={'#334225'} size={40}/>}}/>
      <Tab.Screen name="Recurrents" component={RecurrentEgressScreen} options={{ headerShown: false, title: 'GASTOS RECURRENTES', tabBarIcon: () => <CalendarArrowDown color={'#334225'} size={40}/>}}/>
    </Tab.Navigator>
  );
}
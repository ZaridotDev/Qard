import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShowEgressScreen } from '../ui/screens/HomeStack/CreditStack/ShowEgressScreen';
import { AddEgressScreen } from '../ui/screens/HomeStack/CreditStack/AddEgressScreen';
import { AddCardScreen } from '../ui/screens/HomeStack/CreditStack/AddCardScreen';
import { CreditCard, List, SquarePlus } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export function CreditStack() {
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
      <Tab.Screen name="ShowEgress" component={ShowEgressScreen} options={{ headerShown: false, tabBarIcon: () => <List color={'#334225'} size={40}/> }}/>
      <Tab.Screen name="AddEgress" component={AddEgressScreen} options={{ headerShown: false, tabBarIcon: () => <SquarePlus color={'#334225'} size={40}/> }}/>
      <Tab.Screen name="AddCard" component={AddCardScreen} options={{ headerShown: false, tabBarIcon: () => <CreditCard color={'#334225'} size={40}/> }}/>
    </Tab.Navigator>
  );
}
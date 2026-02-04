import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShowEgressScreen } from '../ui/screens/HomeStack/CreditStack/ShowEgressScreen';
import { AddEgressScreen } from '../ui/screens/HomeStack/CreditStack/AddEgressScreen';
import { AddCardScreen } from '../ui/screens/HomeStack/CreditStack/AddCardScreen';

const Tab = createBottomTabNavigator();

export function CreditStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ShowEgress" component={ShowEgressScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="AddEgress" component={AddEgressScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="AddCard" component={AddCardScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
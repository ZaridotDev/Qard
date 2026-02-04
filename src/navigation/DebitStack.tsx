import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WalletsStack } from './DebitStack/WalletsStack';
import { HistoryStack } from './DebitStack/HistoryStack';
import { RecurrentEgressScreen } from '../ui/screens/HomeStack/DebitStack/RecurrentEgressScreen';


const Tab = createBottomTabNavigator();

export function DebitStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Wallets" component={WalletsStack} options={{ headerShown: false }}/>
      <Tab.Screen name="History" component={HistoryStack} options={{ headerShown: false }}/>
      <Tab.Screen name="Recurrents" component={RecurrentEgressScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
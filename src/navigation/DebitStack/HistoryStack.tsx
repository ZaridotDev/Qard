import { createStackNavigator } from '@react-navigation/stack';
import { HistoryScreen } from '../../ui/screens/HomeStack/DebitStack/HistoryScreen';
import { HistoryDetailsScreen } from '../../ui/screens/HomeStack/DebitStack/HistoryDetailsScreen';

const Stack = createStackNavigator();

export function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Details" component={HistoryDetailsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
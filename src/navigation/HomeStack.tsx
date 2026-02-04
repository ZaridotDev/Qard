import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../ui/screens/HomeStack/HomeScreen';
import { DebitStack } from './DebitStack';
import { CreditStack } from './CreditStack';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Debit" component={DebitStack} options={{ headerShown: false }}/>
      <Stack.Screen name="Credit" component={CreditStack} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
import { createStackNavigator } from '@react-navigation/stack';
import { WalletScreen } from '../../ui/screens/HomeStack/DebitStack/WalletScreen';
import { CalculateEgressScreen } from '../../ui/screens/HomeStack/DebitStack/CalculateEgressScreen';

const Stack = createStackNavigator();

export function WalletsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Wallets" component={WalletScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Calculator" component={CalculateEgressScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
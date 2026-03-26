import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../ui/screens/HomeStack/HomeScreen';
import { NavMenuStack } from './NavMenuStack';
import { CreditStack } from './CreditStack';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="NavMenu" component={NavMenuStack} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
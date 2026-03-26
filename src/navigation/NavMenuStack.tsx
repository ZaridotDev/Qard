
import { WalletsStack } from './DebitStack/WalletsStack';
import { HistoryStack } from './DebitStack/HistoryStack';
import { RecurrentEgressScreen } from '../ui/screens/HomeStack/NavMenuStack/RecurrentEgressScreen';
import { Wallet, History, CalendarArrowDown } from 'lucide-react-native';
import { colors } from '../ui/styles/colors';
import { NavMenuScreen } from '../ui/screens/HomeStack/NavMenuStack/NavMenuScreen';
import { QuickExpenseScreen } from '../ui/screens/HomeStack/NavMenuStack/QuickExpenseScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { CreditStack } from './CreditStack';


const Stack = createStackNavigator();

export function NavMenuStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        
      }}
    >
      <Stack.Screen name="NavMenu" component={NavMenuScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="QuickExpense" component={QuickExpenseScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Credit" component={CreditStack} options={{ headerShown: false }} />
      <Stack.Screen name="Wallets" component={WalletsStack} options={{ headerShown: false }} />
      <Stack.Screen name="History" component={HistoryStack} options={{ headerShown: false }}/>
      <Stack.Screen name="Recurrents" component={RecurrentEgressScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
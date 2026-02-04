import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AnalyticsScreen } from '../ui/screens/AnaliticsStack/AnalyticsScreen';
import { SessionScreen } from '../ui/screens/SessionStack/SessionScreen';
import { HomeStack } from './HomeStack';

const Drawer = createDrawerNavigator();

export function HamburgerMenu() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Analytics" component={AnalyticsScreen} />
      <Drawer.Screen name="Session" component={SessionScreen} />
    </Drawer.Navigator>
  );
}
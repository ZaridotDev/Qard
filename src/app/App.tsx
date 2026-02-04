import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { HamburgerMenu } from '../navigation/HamburgerMenu';

export default function App() {
  return (
    <NavigationContainer>
      <HamburgerMenu/>
    </NavigationContainer>
  ); 
}

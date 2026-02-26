import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { HamburgerMenu } from '../navigation/HamburgerMenu';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
    }
  }, []); 
  
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, backgroundColor: '#F3F7EE'}} >
      <NavigationContainer>
        <HamburgerMenu/>
      </NavigationContainer>
    </SafeAreaView>
  ); 
}

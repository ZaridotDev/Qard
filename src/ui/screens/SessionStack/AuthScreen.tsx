import { View, TextInput, Button, Text } from 'react-native';
import { useState } from 'react';
import { authService } from '../../../services/auth.service';

export function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [env, setEnv] = useState(process.env.EXPO_PUBLIC_ENV);


  const handleSignUp = async () => {
    try {
      const data = await authService.signUp(email, password);
  
      console.log('SIGN UP DATA', data);
  
      if (!data.session) {
        console.log('Usuario creado pero sin sesión (email confirmation)');
      } else {
        console.log('Usuario creado y logueado');
      }
    } catch (error) {
      console.error('ERROR REGISTRO', error);
    }
  };

  
  return (
    <View style={{ padding: 24 }}>
      <Text>Auth test {env}</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 12 }}
      />

      <Button
        title="Registrarse"
        onPress={handleSignUp}
      />

      <Button
        title="Login"
        onPress={() => authService.signIn(email, password)}
      />
    </View>
  );
}

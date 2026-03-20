import { View, TextInput, Button, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { authService } from '../../../services/auth.service';
import { ButtonStack } from '../../components/ButtonStack';
import { colors } from '../../styles/colors';
import Toast from 'react-native-toast-message';

export function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [env, setEnv] = useState(process.env.EXPO_PUBLIC_ENV);

  const handleSignIn = async () => {
    try {
        await authService.signIn(email, password);
    } catch (err: any) {
        if (err.message.includes('Invalid login credentials')) {
            Toast.show({ type: 'error', text1: 'Email o contraseña incorrectos' });
        } else {
            Toast.show({ type: 'error', text1: 'Error al iniciar sesión', text2: "Falta algun dato para iniciar"});
        }
    }
  };

  const handleSignUp = async () => {
    try {
      const data = await authService.signUp(email, password);
  
      console.log('SIGN UP DATA', data);
  
      if (!data.session) {
        console.log('Usuario creado pero sin sesión (email confirmation)');
        Toast.show({
          type: 'info',
          text1: 'Te hamos enviado un email de confirmacion',
          text2: 'Por favor, verifica tu casilla de correos',
        })
    } else {
      Toast.show({
        type: 'success',
        text1: 'Usuario creado y logueado',
      })
    }
  } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error registrando el usuario',
        text2: 'Por favor, complete los campos',
      })
    }
  };

  
  return (
    <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <View 
      style={{ 
        padding: 24,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors[5]
      }}
      >
      <Text
        style={{
          color: 'white', 
          fontSize: 22, 
          marginBottom: 8, 
          fontWeight: 'bold',
        }}
      >
        INICIA SESIÓN O REGISTRATE
      </Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, marginBottom: 15, borderRadius: 10  }}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, borderRadius: 10}}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '80%',
          alignSelf: 'center',
          top: -10
        }}
      >
        <ButtonStack
          text="Registrarse"
          onPress={handleSignUp}
          />

        <ButtonStack
          text="Login"
          onPress={handleSignIn}
          />
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}

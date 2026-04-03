import { View, TextInput, Button, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { authService } from '../../../services/auth.service';
import { ButtonStack } from '../../components/ButtonStack';
import { colors } from '../../styles/colors';
import Toast from 'react-native-toast-message';
import { Eye, EyeOff } from 'lucide-react-native';
import { Loading } from '../../components/Loading';

export function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [haveAccount, setHaveAccount] = useState(false);
  const [optionSelected, setOptionSelected] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        setVisible(true)
        console.log('Usuario creado pero sin sesión (email confirmation)', data);
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

      <Loading visible={visible}/>
      <View 
      style={{ 
        padding: 24,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors[5]
      }}
      >
      { !optionSelected 
      ? <>
      <Text
        style={{
          color: 'white', 
          fontSize: 22, 
          marginBottom: 8, 
          fontWeight: 'bold',
        }}
        >
        ¿Ya tenes una cuenta?
      </Text>

      <ButtonStack
        tp={5}
        bt={15}
        isFullWidth={true}
        ctr
        text="INICIAR SESIÓN"
        onPress={() => {
          setHaveAccount(true)
          setOptionSelected(true)
        }}
        />
      <Text
        style={{
          color: 'white', 
          fontSize: 16, 
          // marginBottom: 8, 
          // fontWeight: 'bold',
        }}
        >
        o crea una cuenta
      </Text>
      <ButtonStack
      tp={1}
      text="REGISTRARSE"
      onPress={() => {
        setHaveAccount(false)
        setOptionSelected(true)
      }}
      />
      <TouchableOpacity onPress={() =>  setVisible(true)}><Text>asdasd</Text></TouchableOpacity>
      </>
      : <></>}


      {optionSelected 
      ? 
      <>
      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.placeholder}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, marginBottom: 15, borderRadius: 10  }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={colors.placeholder}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={{ borderWidth: 1, width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, borderRadius: 10}}
          />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 10 }}>
          {showPassword 
          ? <EyeOff color={colors.placeholder} size={20}/> 
          : <Eye color={colors.placeholder} size={20}/>}
        </TouchableOpacity>
      </View>
      { haveAccount

        ? <ButtonStack
        text="INICIAR SESIÓN"
        onPress={handleSignIn}
        />

        : <ButtonStack
          text="REGISTRARSE"
          onPress={handleSignUp}
          />
      }

      { haveAccount

        ? <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20, alignSelf: 'center' }}>
          <Text style={{ color: 'white', fontSize: 18}}>
            {`Crear cuenta, `} 
          </Text>
            <TouchableOpacity 
              onPress={() => {
                setHaveAccount(false)
                setOptionSelected(true)
              }}
              style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center',}}
              >
              <Text style={{ color: colors[7], fontSize: 18 }}>
                registrarse
              </Text>
            </TouchableOpacity>
        </View>

        : <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20, alignSelf: 'center' }}>
          <Text style={{ color: 'white', fontSize: 18}}>
            {`si ya tenes una cuenta, `}
          </Text>
            <TouchableOpacity 
              onPress={() => {
                setHaveAccount(true)
                setOptionSelected(true)
              }}
              style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center',}}
              >
              <Text style={{ color: colors[7], fontSize: 18}}>
                iniciar sesión
              </Text>
            </TouchableOpacity>
        </View>
      }
        </>
      : <></>}
    </View>
    </KeyboardAvoidingView>
  );
}

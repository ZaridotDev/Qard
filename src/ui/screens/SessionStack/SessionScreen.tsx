import { View, Text, Button } from "react-native";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import { AuthScreen } from "./AuthScreen";
import { authService } from "../../../services/auth.service";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { DrawerButon } from "../../components/DrawerButon";
import { ButtonStack } from "../../components/ButtonStack";

export function SessionScreen () {
    
    
  const { isAuthenticated, user, loading } = useAuth();
  const [env, setEnv] = useState(process.env.EXPO_PUBLIC_ENV);

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }
  
  
    return (
        <View
          style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
          }}
        >
          <DrawerButon />
          <Text>Logueado como:</Text>
          <Text>{user?.email}</Text>

          <ButtonStack
            text="Logout"
            onPress={() => authService.signOut()}
          />
        </View>
    )
}

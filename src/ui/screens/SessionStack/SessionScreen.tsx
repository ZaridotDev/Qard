import { View, Text, Button } from "react-native";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import { AuthScreen } from "./AuthScreen";
import { authService } from "../../../services/auth.service";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { DrawerButon } from "../../components/DrawerButon";

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
        <View>
          <DrawerButon />
          <Text>Logueado como:</Text>
          <Text>{user?.email} en {env}</Text>

          <Button
            title="Logout"
            onPress={() => authService.signOut()}
          />
        </View>
    )
}

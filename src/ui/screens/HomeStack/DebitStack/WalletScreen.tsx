import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { BackButton } from "../../../components/BackButton";

export function WalletScreen () {
    const navigation = useNavigation();

    return (
        <View>
            <BackButton/>
            <Text>Pantalla de Presupuestos por categoria</Text>
            <Button onPress={() => navigation.navigate('Calculator')} title={"Calculadora"}/>
        </View>
    )
}
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { BackButton } from "../../../components/BackButton";

export function HistoryScreen () {
    const navigation = useNavigation();

    return (
        <View>
            <BackButton/>
            <Text>Pantalla de historial de gastos de debito</Text>
            <Button onPress={() => navigation.navigate('Details')} title={"Detalle"}/>
        </View>
    )
}
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";

export function BackButton () {
    const navigation = useNavigation();

    return (
        <Button onPress={() => navigation.goBack()} title={"Volver"}/>
    )
}
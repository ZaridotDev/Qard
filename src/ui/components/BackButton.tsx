import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronUp } from "lucide-react-native";
import { useState } from "react";

type BackButtonType = {
    confirm?: (visible: boolean) => void
}
export function BackButton ({confirm}: BackButtonType) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
        onPress={() => confirm ? confirm(true) : navigation.goBack()}
        style={{marginBottom: 50}}
        >
            <View style={{ flex: 1, alignItems: 'center'}}>
                <ChevronUp size={34}/>
                <Text style={{position: "absolute", top: 20}}>Volver</Text>
            </View>
        </TouchableOpacity>
    )
}
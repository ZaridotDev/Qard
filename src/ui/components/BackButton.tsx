import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronUp } from "lucide-react-native";


export function BackButton () {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={{marginBottom: 50}}
        >
            <View style={{ flex: 1, alignItems: 'center'}}>
                <ChevronUp size={34}/>
                <Text style={{position: "absolute", top: 20}}>Volver</Text>
            </View>
        </TouchableOpacity>
    )
}
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronUp } from "lucide-react-native";

type BackButtonType = 
    | { confirm: (visible: boolean) => void; onClick?: never }  
    | { onClick: () => void; confirm?: never }  

export function BackButton ({confirm, onClick}: BackButtonType) {

    return (
        <TouchableOpacity 
        onPress={() => confirm ? confirm(true) : onClick()}
        style={{marginBottom: 50}}
        >
            <View style={{ flex: 1, alignItems: 'center'}}>
                <ChevronUp size={34}/>
                <Text style={{position: "absolute", top: 20}}>Volver</Text>
            </View>
        </TouchableOpacity>
    )
}
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { colors } from "../styles/colors";

type BackButtonType = 
    | { confirm: (visible: boolean) => void; onClick?: never }  
    | { onClick: () => void; confirm?: never }  

export function BackButton ({confirm, onClick}: BackButtonType) {

    return (
        <TouchableOpacity 
        onPress={() => confirm ? confirm(true) : onClick()}
        style={{marginBottom: 50}}
        >
            <View style={{ 
                // backgroundColor: colors[3], 
                position: 'absolute', 
                borderRadius: 20, 
                // top: 5, 
                left: 10,
                paddingVertical: 4,
                flexDirection: 'row'
            }}>
                <ChevronLeft size={30}/>
                <Text style={{ textAlignVertical: 'center', fontSize: 16}}>Volver</Text>
            </View>
        </TouchableOpacity>
    )
}
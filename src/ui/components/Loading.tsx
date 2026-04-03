import { SquarePen, Trash } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

type LoadingType = {
    visible: boolean;
}

export function Loading ({visible}: LoadingType) {

    return (
        <>
            { visible
            ? <View style={{ zIndex: 10,position: 'absolute', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', top: 0, left: 0, right: 0, bottom: 0 }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Cargando...</Text>
            </View>
            : null
            }
        </>
    )
}
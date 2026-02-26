import { Plus } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

type PlusButtonType = {
    onPress: () => void;
}
export function PlusButton ({onPress}: PlusButtonType) {
    return (
        <TouchableOpacity 
            style={{ alignItems: 'center', marginTop: 40}}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View 
            style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                backgroundColor: '#D9E7CB',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
                }}
            >
                <Plus />
            </View>
        </TouchableOpacity>
    )
}
import { View, Text, TouchableOpacity } from "react-native";

type ButtonStackType = {
    text: string;
    onPress: () => void;
    bt?: number;
}
export function ButtonStack ({text, onPress, bt}: ButtonStackType) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={{ 
                backgroundColor: '#D9E7CB', 
                width: 'auto', 
                padding: 15, 
                borderRadius: 10, 
                marginTop: 30, 
                alignSelf: 'center',
                elevation: 5,
                marginBottom: bt ? bt : 0,
            }}>
            <View >
                <Text style={{fontSize: 20}}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
import { View, Text, TouchableOpacity } from "react-native";

type ButtonStackType = {
    text: string;
    onPress: () => void;
}
export function ButtonStack ({text, onPress}: ButtonStackType) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={{ 
                backgroundColor: '#D9E7CB', 
                width: 'auto', 
                padding: 15, 
                borderRadius: 10, 
                marginTop: 30, 
                alignSelf: 'flex-end',
                elevation: 5,
            }}>
            <View >
                <Text style={{fontSize: 20}}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
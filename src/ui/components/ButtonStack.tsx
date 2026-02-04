import { View, Text, TouchableOpacity } from "react-native";

type ButtonStackType = {
    text: string;
    onPress: () => void;
}
export function ButtonStack ({text, onPress}: ButtonStackType) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={{ backgroundColor: 'yellow', width: 'auto', padding: 10, borderRadius: 10, marginTop: 30, alignSelf: 'flex-end'}}>
            <View >
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
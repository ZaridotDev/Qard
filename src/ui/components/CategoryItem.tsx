import { View, Text, TouchableOpacity } from "react-native";

type CategoryItemType = {
    text: string;
}
export function CategoryItem ({text}: CategoryItemType) {
    return (
        <View 
            style={{
                width: '60%', 
                height: 50, 
                backgroundColor: '#5C7E3B', 
                alignContent: 'center', 
                justifyContent: 'center', 
                borderRadius: 15, 
                alignItems: 'center', 
                elevation: 10,
                left: 10,
                marginVertical: 15
            }}>
                <Text style={{color: 'white', fontSize: 24}}>{text}</Text>
        </View> 
    )
}
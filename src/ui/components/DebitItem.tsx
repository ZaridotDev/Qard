import { useNavigation } from "@react-navigation/native";
import { SquarePen, Trash } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

type DebitItemType = {
    text: string;
    amount: string;
    onPress?: () => void;
}

export function DebitItem ({text, amount, onPress}: DebitItemType) {

    return (
        <TouchableOpacity
            style={{width: '90%',  minHeight: 40, height: 'auto', marginVertical: 4, alignSelf: 'center', }}
            onPress={onPress}
            activeOpacity={ onPress ? 0.9 : 1 }
        >
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#93B771", alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, elevation: 5, paddingLeft: 8}}>
                <View style={{ paddingHorizontal: 4, flex: 4}}>
                    <Text style={{ fontSize: 18, color: 'white', }}>{text}</Text>
                </View>

                <View style={{ paddingHorizontal: 4, flex: 2}}>
                    <Text style={{ fontSize: 18, textAlign: 'right', color: 'white'}}>{amount}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ paddingVertical: 4, paddingHorizontal: 4 }}>
                        <SquarePen size={22} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingVertical: 4, paddingRight: 8 }} onPress={() => console.log('borrar budget')}>
                        <Trash size={22} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}
import { SquarePen, Trash } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

type HistoryItemType = {
    text: string;
    amount: string;
    onPress?: () => void;
    date?: string;
}

export function HistoryItem ({text, amount, onPress, date}: HistoryItemType) {

    return (
        <TouchableOpacity
            style={{width: '90%',  minHeight: 40, height: 'auto', marginVertical: 4, alignSelf: 'center'}}
            onPress={onPress}
            activeOpacity={ onPress ? 0.9 : 1 }
        >
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#93B771", alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, elevation: 5, paddingHorizontal: 8}}>
                <View style={{ paddingHorizontal: 4, flex: 6}}>
                    <Text style={{ fontSize: 18, color: 'white', }}>{text}</Text>
                </View>

                <View style={{ paddingHorizontal: 4, flex: 3}}>
                    <Text style={{ fontSize: 18, textAlign: 'right', color: 'white'}}>{amount}</Text>
                </View>
                <View style={{ paddingHorizontal: 4, flex: 2}}>
                    <Text style={{ fontSize: 18, textAlign: 'right', color: 'white'}}>{date}</Text>
                </View>

                {/* <TouchableOpacity style={{ paddingVertical: 4, paddingHorizontal: 8 }} onPress={() => console.log('borrar budget')}>
                    <Trash size={22} color={'white'} />
                </TouchableOpacity> */}
            </View>
        </TouchableOpacity>
    )
}
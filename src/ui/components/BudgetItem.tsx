import { useNavigation } from "@react-navigation/native";
import { SquarePen, Trash } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

export function BudgetItem () {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
        style={{width: '90%', height: 40, marginVertical: 4, alignSelf: 'center', }}
        onPress={() => navigation.navigate('Calculator')}
        >
            <View style={{ flex: 1,  flexDirection: 'row', backgroundColor: "#93B771", alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, elevation: 5, paddingLeft: 8}}>
                <View style={{ paddingHorizontal: 4, flex: 4}}>
                    <Text style={{ fontSize: 18}}>Comida</Text>
                </View>
                <View style={{ paddingHorizontal: 4, flex: 2}}>
                    <Text style={{ fontSize: 18, textAlign: 'right'}}>$0.000,000</Text>
                </View>
                <View style={{  flexDirection: 'row'}}>
                    <TouchableOpacity style={{ paddingVertical: 4, paddingHorizontal: 4 }}>
                        <SquarePen size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingVertical: 4, paddingRight: 8 }} onPress={() => console.log('borrar budget')}>
                        <Trash size={22} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}
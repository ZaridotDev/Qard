import { View, Text, TouchableOpacity } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { DebitItem } from "../../../components/DebitItem";

export function HistoryDetailsScreen () {
    return (
        <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
            <BackButton/>
            {/* View de totales */}
            <View style={{width: '80%', height: 120, backgroundColor: "#93B771", alignSelf: 'center', borderRadius:15, marginBottom: 50, paddingTop: 10, alignItems: 'center'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                    <Text style={{ fontSize: 22, color: 'white'}}>Coto</Text>
                    <Text style={{ fontSize: 14, color: 'white', position: 'absolute', right: 20, top: 10}}>12/2</Text>
                </View>
                <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold'}}>$15.000</Text>
            </View>
            {/* Reutilizar BudgetItems para los items de compra */}
            
            <DebitItem text="mermelada" amount="$0.000"/>
            <DebitItem text="pan" amount="$0.000"/>
            <DebitItem text="leche" amount="$0.000"/>
        </View>
    )
}
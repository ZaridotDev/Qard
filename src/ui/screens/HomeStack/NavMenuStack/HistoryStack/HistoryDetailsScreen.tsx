import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { BackButton } from "../../../../components/BackButton";
import { DebitItem } from "../../../../components/DebitItem";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HistoryStackParams } from "../../../../../types/navigation";
import { formatCurrency } from "../../../../../utils/currency";

type DetailsRouteProp = RouteProp<HistoryStackParams, 'Details'>;

export function HistoryDetailsScreen () {
    const navigation = useNavigation<StackNavigationProp<HistoryStackParams>>();
    const route = useRoute<DetailsRouteProp>();
    const { shoppingItems, transactionName, transactionAmount, transactionDate} = route.params;

    return (
        <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
            <BackButton onClick={() => navigation.navigate('History')}/>
            {/* View de totales */}
            <View style={{width: '80%', height: 120, backgroundColor: "#93B771", alignSelf: 'center', borderRadius:15, marginBottom: 50, paddingTop: 10, alignItems: 'center'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                    <Text style={{ fontSize: 22, color: 'white'}}>{transactionName}</Text>
                    <Text style={{ fontSize: 14, color: 'white', position: 'absolute', right: 20, top: 10}}>{transactionDate}</Text>
                </View>
                <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold'}}>{formatCurrency(transactionAmount)}</Text>
            </View>
            {/* Reutilizar BudgetItems para los items de compra */}
            
            <FlatList 
                data={shoppingItems} 
                renderItem={({ item }) => (
                    <DebitItem 
                        text={item.description}
                        amount={formatCurrency(item.price)}
                        quantity={item.quantity}
                        woBtns
                    />
                )}
            />
        </View>
    )
}
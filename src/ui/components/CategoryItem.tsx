import { View, Text, FlatList } from "react-native";
import { HistoryItem } from "./HistoryItem";
import { formatCurrency } from "../../utils/currency";
import { formatDateForUI } from "../../utils/dateFormatUI";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HistoryStackParams, ShoppingItemsType } from "../../types/navigation";

type CategoryItemType = {
    text: string;
    transactions: TransactionsType[];
}

type TransactionsType = {
    description: string;
    amount: number;
    transaction_date: string;
    shopping_items: ShoppingItemsType[];
}

export function CategoryItem ({text, transactions}: CategoryItemType) {
    
    const navigation = useNavigation<StackNavigationProp<HistoryStackParams>>();
    return (
        <View
            style={{flex: 1, justifyContent: 'center'}}
        >
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
                <FlatList 
                    data={transactions}
                    renderItem={({item}) => 
                        <View
                            // style={{ flex: 1,}}
                            >
                            <HistoryItem 
                                text={item.description} 
                                amount={formatCurrency(item.amount)}
                                date={formatDateForUI(item.transaction_date)} 
                                onPress={() => {
                                    console.log(item)
                                    navigation.navigate('Details', {
                                    transactionName: item.description,
                                    transactionAmount: item.amount,
                                    transactionDate: formatDateForUI(item.transaction_date),
                                    shoppingItems: item.shopping_items
                                })}}
                                />
                        </View>
                    }
                />
        </View>
    )
}
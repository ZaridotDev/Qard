import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { DebitItem } from "../../../components/DebitItem";
import { PlusButton } from "../../../components/PlusButton";
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { WalletsStackParams } from '../../../../types/navigation';
import { formatCurrency } from "../../../../utils/currency";
import { useEffect, useState } from "react";
import { ModalShoppingItem } from "../../../components/Modals/ModalShoppingItem";
import { ModalAlert } from "../../../components/Modals/ModalAlert";

type CalculatorRouteProp = RouteProp<WalletsStackParams, 'Calculator'>;

export type ShoppingItemsType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export function CalculateEgressScreen () {
    const [shoppingItems, setShoppingItems] = useState<ShoppingItemsType[]>([])
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false)
    const route = useRoute<CalculatorRouteProp>();
    const { category } = route.params;
    const navigation = useNavigation();

    const handleAddItem = (item: ShoppingItemsType) => {
        setShoppingItems((prev) => [...prev, item]);  
    };

    useEffect(() => {
        
    }, [shoppingItems]);

    return (
        <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
            <BackButton confirm={(arg: boolean) => setAlert(arg)}/>
            <ModalAlert visible={alert} onClose={() => setAlert(false)} back={() => navigation.goBack()} />
            {/* View de totales */}
            { category.budgets[0]?.amount 
            ? <View style={{width: '80%', height: 150, backgroundColor: "#93B771", alignSelf: 'center', borderRadius:15, marginBottom: 50, paddingTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 22, color: 'white'}}>{category.name}</Text>
                <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold'}}>{formatCurrency(category.budgets[0]?.amount)}</Text>
                <Text style={{ fontSize: 30, color: 'white'}}>Sumas</Text>
            </View>
            : <View style={{width: '80%', height: 150, backgroundColor: "#93B771", alignSelf: 'center', borderRadius:15, marginBottom: 50, paddingTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 22, color: 'white'}}>{category.name}</Text>
                <Text style={{ fontSize: 22, color: 'white'}}>Sin Presupuesto</Text>
                <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold'}}>Sumas</Text>
            </View>
            }
            {/* Reutilizar BudgetItems para los items de compra */}
            
                <View style={{height: 'auto',maxHeight: '75%'}}>
                    <FlatList 
                    data={shoppingItems} 
                    renderItem={({ item }) => (
                        <DebitItem 
                            text={item.name}
                            amount={formatCurrency(item.price * item.quantity)}
                            quantity={item.quantity}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: 20 }}>
                            Ingresá nuevos items
                        </Text>
                    }
                    />
                </View>
            {/* Boton add Item */}
            <ModalShoppingItem 
                visible={visible} 
                onClose={() => setVisible(false)} 
                onAddItem={handleAddItem} 
            />

            <PlusButton onPress={() => setVisible(true)}/>
            {/* Boton Comprar */}
            <TouchableOpacity 
                onPress={() => console.log('comprar')}
                activeOpacity={0.9}
                style={{
                    width: '60%', 
                    height: 50, 
                    alignSelf: 'center', 
                    justifyContent: 'flex-end',
                    position: 'absolute', 
                    bottom: 50,
            }}>
                <View 
                style={{
                    backgroundColor: '#5C7E3B', 
                    flex: 1, 
                    alignContent: 'center', 
                    justifyContent: 'center', 
                    borderRadius: 15, 
                    alignItems: 'center', 
                    elevation: 10,
                }}>
                    <Text style={{color: 'white', fontSize: 24}}>Comprar</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
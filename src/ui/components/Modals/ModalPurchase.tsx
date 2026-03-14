import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { transactionService } from "../../../services/src/services/transactions.service";
import { getMonthRange } from "../../../utils/date";
import { useState } from "react";
import { X } from "lucide-react-native";
import { ShoppingItemsType } from "../../screens/HomeStack/DebitStack/CalculateEgressScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { WalletsStackParams } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { budgetingService } from "../../../services/src/services/budgeting.service";

type ModalPurchaseType = {
    visible: boolean;
    onClose: (closed: boolean, saved?: boolean) => void;
    shoppingItems: ShoppingItemsType[];
    idBudget: string;
    idCategory: string;
}

export function ModalPurchase ({visible, onClose, shoppingItems, idBudget}: ModalPurchaseType) {
    const navigation = useNavigation<StackNavigationProp<WalletsStackParams>>();
    const [description, setDescription] = useState("")
    
    
    const createPurchase = async () => {
        if  ( description != '') {
            let totalAmount: number = 0
            for (let i = 0; i < shoppingItems.length; i++) {
                totalAmount += shoppingItems[i].price * shoppingItems[i].quantity
            }
            
            try {
                const {today} = getMonthRange(new Date());
                await transactionService.insert({
                    type: 'expense',
                    amount: totalAmount, // tiene que ser la suma de los shoppingItems
                    description: description, // traido del Textinput
                    transaction_date: today, 
                });
            } catch (error) {
                console.error('Error creando transaction', error);
                onClose(false);
            }

            if (idBudget != '') {
                try {
                    const {error: fetchError, data: currentBudget} = await budgetingService.getBudget(idBudget)
                    
                    if (fetchError) {
                        console.error('Error obteniendo budget:', fetchError.message);
                        return;
                    }

                    const newAmount = currentBudget.amount - totalAmount;
                    
                    const {error: updateError} = await budgetingService.updateBudget(idBudget, newAmount)
                    
                    if (updateError) {
                        console.error('Error actualizando budget:', updateError.message);
                    } else {
                        console.log('Budget actualizado con éxito, nuevo monto:', newAmount );
                    }
                    
                    onClose(false);
                    setDescription('');
                    navigation.navigate('Wallets')
                    return;
                } catch (error) {
                    console.error('Error en la compra', error);
                    onClose(false);
                }
            } else {
                onClose(false);
                setDescription('');
                navigation.navigate('Wallets')
                return;
            }
        } else console.log("ingresa un nombre a la compra para guardarla")
    }

    return (
        <Modal
            visible={visible}
            animationType='fade'
            backdropColor={'rgba(0, 0, 0, 0.1)'}
        >
            <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
                <View style={{alignSelf: 'center', width: '80%', height: 'auto', backgroundColor: '#BAD3A2', padding: 20, borderRadius: 15, alignItems: 'center'}}>
                    <TouchableOpacity 
                    onPress={() => {
                        setDescription('');
                        onClose(false);
                    }} 
                    style={{ padding: 10, position: 'absolute', top: 5, right:5 }}
                    >
                        <X size={24} color={'white'} />
                    </TouchableOpacity>

                    <Text style={{color: 'white', fontSize: 22, marginBottom: 4, fontWeight: 'bold'}}>Nombre compra</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, marginBottom: 15,}}
                        placeholder="Supermercado"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                    <TouchableOpacity 
                    onPress={() => createPurchase()} 
                    >
                        <View style={{backgroundColor: '#5C7E3B', padding: 10, borderRadius: 10,}}>
                            <Text style={{color: 'white', fontSize: 20}}>Aceptar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
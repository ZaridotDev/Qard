import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { transactionService } from "../../../services/src/services/transactions.service";
import { getMonthRange } from "../../../utils/date";
import { useState } from "react";
import { X } from "lucide-react-native";
import { ShoppingItemsType } from "../../screens/HomeStack/NavMenuStack/WalletsStack/CalculateEgressScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { WalletsStackParams } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { budgetingService } from "../../../services/src/services/budgeting.service";
import { shoppingItemsService } from "../../../services/src/services/shoppintItems.service";
import Toast from "react-native-toast-message";
import { colors } from "../../styles/colors";

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
                const {data: transactionData, error: transactionError} = await transactionService.insert({
                    type: 'expense',
                    amount: totalAmount, // tiene que ser la suma de los shoppingItems
                    description: description, // traido del Textinput
                    transaction_date: today, 
                    category_id: shoppingItems[0].idCategory,
                });

                if (transactionError) throw transactionError;
                
                for (let i=0; i<shoppingItems.length; i++){
                    const {error: shoppingItemsError} = await shoppingItemsService.insertItems({
                        transaction_id: transactionData.id,                        
                        category_id: shoppingItems[i].idCategory,
                        description: shoppingItems[i].name,
                        price: shoppingItems[i].price,
                        quantity: shoppingItems[i].quantity,
                    })
                    
                    if (shoppingItemsError) throw shoppingItemsError;
                }
                
                Toast.show({
                    type: 'success',
                    text1: 'Compra realizada',
                })
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error creando transaction',
                    text2: (error as Error).message.toString()
                })
                onClose(false);
            }
            
            if (idBudget != '') {
                try {
                    const {error: fetchError, data: currentBudget} = await budgetingService.getBudget(idBudget)
                    
                    if (fetchError) {
                        Toast.show({
                            type: 'error',
                            text1: 'Error obteniendo budget',
                            text2: (fetchError as Error).message.toString()
                        })
                        return;
                    }
                    
                    const newAmount = currentBudget.amount - totalAmount;
                    
                    const {error: updateError} = await budgetingService.updateBudget(idBudget, newAmount)
                    
                    if (updateError) {
                        Toast.show({
                            type: 'error',
                            text1: 'Error actualizando budget',
                            text2: (updateError as Error).message.toString()
                        })
                    } else {
                        Toast.show({
                            type: 'success',
                            text1: 'Budget actualizado con éxito, nuevo monto',
                            text2: newAmount.toString()                        
                        })
                    }
                    
                    onClose(false);
                    setDescription('');
                    navigation.navigate('Wallets')
                    return;
                } catch (error) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error en la compra',
                        text2: (error as Error).message.toString()
                    })
                    onClose(false);
                }
            } else {
                onClose(false);
                setDescription('');
                navigation.navigate('Wallets')
                return;
            }
        } else {
            Toast.show({
                type: 'info',
                text1: 'ingresa un nombre a la compra para guardarla',
            })
            
        }
    }

    return (
        <Modal
            visible={visible}
            animationType='fade'
            backdropColor={'rgba(0, 0, 0, 0.1)'}
        >
            <TouchableOpacity 
                onPress={() => onClose(false)}
                activeOpacity={1}
                style={{flex: 1, justifyContent: 'center', padding: 20}}>
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
                        placeholderTextColor={colors.placeholder}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                    <TouchableOpacity 
                    onPress={() => createPurchase()} 
                    // onPress={() => prueba()} 
                    >
                        <View style={{backgroundColor: '#5C7E3B', padding: 10, borderRadius: 10,}}>
                            <Text style={{color: 'white', fontSize: 20}}>Aceptar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
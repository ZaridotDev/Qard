import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { transactionService } from "../../../services/src/services/transactions.service";
import { getMonthRange } from "../../../utils/date";
import { useState } from "react";
import { X } from "lucide-react-native";
import { formatCurrency } from "../../../utils/currency";
import Toast from "react-native-toast-message";
import { colors } from "../../styles/colors";

type ModalIncomeType = {
    visible: boolean;
    onClose: (closed: boolean, saved?: boolean) => void;
}

export function ModalIncome ({visible, onClose}: ModalIncomeType) {
    const [teton, setTeton] = useState<number>(0) // esto es culpa de Joni
    const [description, setDescription] = useState("")
    const [displayAmount, setDisplayAmount] = useState('');    


    const handleAmountChange = (text: string) => {

        const cleaned = text.replace(/\D/g, '');
        const number = parseInt(cleaned) || 0;
        
        setTeton(number);                          
        setDisplayAmount(formatCurrency(number));  
    };

    const createIncome = async () => {
        if  ( teton > 0 && description != '') {
            try {
                const {today: piton} = getMonthRange(new Date());
                await transactionService.insert({
                    type: 'income',
                    amount: teton, 
                    description: description, 
                    transaction_date: piton, 
                });
                
                Toast.show({
                    type: 'success',
                    text1: 'Ingreso creado con éxito'
                })
                onClose(false, true); 
                setTeton(0);
                setDisplayAmount('');
                setDescription('');
                return;
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error creando transaction',
                    text2: (error as Error).message.toString()
                })
                onClose(false);
            }
        } else if (teton < 0) {
            Toast.show({
                type: 'error',
                text1: 'ingresa un monto mayor a 0"'
            })
            return;
        } else if (description === '') {
            Toast.show({
                type: 'error',
                text1: 'ingresa una descripcion a tu ingreso"'
            })
            return;
        }
        Toast.show({
            type: 'error',
            text1: 'ingresa un monto mayor a 0"'
        })
    }

    return (
        <Modal
            visible={visible}
            animationType='fade'
            backdropColor={'rgba(0, 0, 0, 0.1)'}
        >
            <View
                style={{flex: 1, justifyContent: 'center', padding: 20, top: -28}}>
                <Text style={{color: 'white', fontSize: 28, marginBottom: 18, fontWeight: 'bold', alignSelf: 'center'}}>NUEVO INGRESO</Text>
                <View style={{alignSelf: 'center', width: '80%', height: 260, backgroundColor: colors[4], padding: 20, borderRadius: 15, alignItems: 'center'}}>
                    <TouchableOpacity 
                    onPress={() => {
                        setDisplayAmount('');
                        setDescription('');
                        setTeton(0);
                        onClose(false);
                    }} 
                    style={{ padding: 10, position: 'absolute', top: 5, right:5 }}
                    >
                        <X size={24} color={'white'} />
                    </TouchableOpacity>

                    <Text style={{color: 'white', fontSize: 22, marginBottom: 4, fontWeight: 'bold'}}>Descripcion</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, marginBottom: 15 }}
                        placeholder="Ponele nombre al ingreso"
                        placeholderTextColor={colors.placeholder}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                    <Text style={{color: 'white', fontSize: 22, marginBottom: 4, fontWeight: 'bold'}}>Monto</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, marginBottom: 15 }}
                        placeholder={formatCurrency(0)}
                        placeholderTextColor={colors.placeholder}
                        keyboardType="numeric"
                        value={displayAmount}
                        onChangeText={handleAmountChange}
                        
                    />
                    <TouchableOpacity 
                    onPress={() => createIncome()} 
                    >
                        <View style={{backgroundColor: colors[6], padding: 10, borderRadius: 10,}}>
                            <Text style={{color: 'white', fontSize: 20}}>Crear ingreso</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
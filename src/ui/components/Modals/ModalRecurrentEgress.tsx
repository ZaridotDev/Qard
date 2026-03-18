import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { transactionService } from "../../../services/src/services/transactions.service";
import { getMonthRange } from "../../../utils/date";
import { useState } from "react";
import { X } from "lucide-react-native";
import { formatCurrency } from "../../../utils/currency";
import { recurrentEgressType, recurrentEgressService } from "../../../services/src/services/recurrentEgress.service";
import { Selector } from "../Selector";

type ModalRecurerentEgressType = {
    visible: boolean;
    onClose: (closed: boolean, saved?: boolean) => void;
}

export function ModalRecurerentEgress ({visible, onClose}: ModalRecurerentEgressType) {
    const [amount, setAmount] = useState<number>(0) // esto es culpa de Joni
    const [description, setDescription] = useState("")
    const [displayAmount, setDisplayAmount] = useState('');
    const [category, setCategory] = useState('');


    const handleAmountChange = (text: string) => {

        const cleaned = text.replace(/\D/g, '');
        const number = parseInt(cleaned) || 0;
        
        setAmount(number);                          
        setDisplayAmount(formatCurrency(number));  
    };

    const createExpense = async () => {
        if  ( amount > 0 && description != '') {
            try {
                const today = new Date();
                const {data, error} = await recurrentEgressService.insertRecurringTransaction({
                    type: 'expense',
                    amount: amount,
                    description: description, 
                    start_date: today, 
                    category_id: category ? category : ''
                });

                if (error) throw error;
                
                onClose(false, true);
                setAmount(0);
                setDisplayAmount('');
                setDescription('');
                return;
            } catch (error) {
                console.error('Error creando transaction', error);
                onClose(false); // cierra igual para que el usuario pueda reintentar
            }
        } else if (amount < 0) {
            console.log("ingresa un monto mayor a 0")
            return;
        } else if (description === '') {
            console.log("ingresa una descripcion a tu ingreso")
            return;
        }
        console.log("ingresa un monto mayor a 0")
    }

    const restoreCategory = (id: string) => {
        setCategory(id);
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
                        setDisplayAmount('');
                        setDescription('');
                        setAmount(0);
                        onClose(false);
                    }} 
                    style={{ padding: 10, position: 'absolute', top: 5, right:5 }}
                    >
                        <X size={24} color={'white'} />
                    </TouchableOpacity>

                    <Text style={{color: 'white', fontSize: 22, marginBottom: 4, fontWeight: 'bold'}}>Gasto recurrente</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, marginBottom: 15 }}
                        placeholder="Cafe diario"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                    <Text style={{color: 'white', fontSize: 22, marginBottom: 4, fontWeight: 'bold'}}>Monto</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, marginBottom: 15 }}
                        placeholder={formatCurrency(0)}
                        keyboardType="numeric"
                        value={displayAmount}
                        onChangeText={handleAmountChange}
                        
                    />
                    <Selector 
                        title="Categoria" 
                        placeholder="Seleccionar categoria" 
                        center
                        idCategory={restoreCategory}
                        fs={22}
                        />

                    <TouchableOpacity 
                    onPress={() => createExpense()} 
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
import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { transactionService } from "../../../services/src/services/transactions.service";
import { getMonthRange } from "../../../utils/date";
import { useState } from "react";
import { X } from "lucide-react-native";
import { formatCurrency } from "../../../utils/currency";

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
                const transaction = await transactionService.insert({
                    type: 'income',
                    amount: teton, // traido del input del 2do text  input
                    description: description, // traido del inut del 1er text input
                    transaction_date: piton, 
                });
                
                onClose(false); // cerrado y guardado → padre puede refrescar
                setTeton(0);
                setDisplayAmount('');
                setDescription('');
                return;
            } catch (error) {
                console.error('Error creando transaction', error);
                onClose(false); // cierra igual para que el usuario pueda reintentar
            }
        } else if (teton < 0) {
            console.log("ingresa un monto mayor a 0")
            return;
        } else if (description === '') {
            console.log("ingresa una descripcion a tu ingreso")
            return;
        }
        console.log("ingresa un monto mayor a 0")
    }

    return (
        <Modal
            visible={visible}
            animationType='fade'
            backdropColor={'rgba(0, 0, 0, 0.1)'}
        >
            <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
                <View style={{alignSelf: 'center', width: '80%', height: 260, backgroundColor: '#BAD3A2', padding: 20, borderRadius: 15, alignItems: 'center'}}>
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
                        placeholder="Sueldo"
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
                    <TouchableOpacity 
                    onPress={() => createIncome()} 
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
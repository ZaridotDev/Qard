import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { budgetingService } from "../../../services/src/services/budgeting.service";
import { useState } from "react";
import { X } from "lucide-react-native";
import { formatCurrency } from "../../../utils/currency";

type ModalCategoriesType = {
    visible: boolean;
    onClose: (closed: boolean, saved?: boolean) => void;
}

export function ModalCategories ({visible, onClose}: ModalCategoriesType) {
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState<number>(0);          
    const [displayAmount, setDisplayAmount] = useState('');    

    const handleAmountChange = (text: string) => {

    const cleaned = text.replace(/\D/g, '');
    const number = parseInt(cleaned) || 0;
    
    setAmount(number);                          
    setDisplayAmount(formatCurrency(number));  
    };

    const createCategory = async () => {
        try {
            const { data: category, error: categoryError } = await budgetingService.insertCategory({
                name: description,
            });
        
            if (categoryError) throw categoryError;
        
            if (amount > 0) {
                const { error: budgetError } = await budgetingService.insertBudget({
                    category_id: category.id,
                    amount: amount,
                });

                if (budgetError) throw budgetError;
            }
        
            onClose(false, true);
            setDescription('');
            setAmount(0);
            setDisplayAmount('');
        
            } catch (error) {
            console.error('Error creando categoria', error);
            onClose(false);
            }
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
                        setAmount(0);
                        onClose(false);
                    }} 
                    style={{ padding: 10, position: 'absolute', top: 5, right:5 }}
                    >
                        <X size={24} color={'white'} />
                    </TouchableOpacity>

                    <Text style={{color: 'white', fontSize: 22, marginBottom: 4, fontWeight: 'bold'}}>Nombrar categoria</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, marginBottom: 15 }}
                        placeholder="Comida"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                    <Text style={{color: 'white', fontSize: 22, marginBottom: 4, fontWeight: 'bold'}}>Ingresa cuanto gastar</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, marginBottom: 15 }}
                        placeholder={formatCurrency(0)}
                        keyboardType="numeric"
                        value={displayAmount}
                        onChangeText={handleAmountChange}
                    />
                    <TouchableOpacity 
                    onPress={() => createCategory()} 
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
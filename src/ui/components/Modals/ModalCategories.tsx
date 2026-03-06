import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { budgetingService } from "../../../services/src/services/budgeting.service";
import { useState } from "react";
import { X } from "lucide-react-native";

type ModalCategoriesType = {
    visible: boolean;
    onClose: (closed: boolean, saved?: boolean) => void;
}

export function ModalCategories ({visible, onClose}: ModalCategoriesType) {
    const [description, setDescription] = useState("")
    const [budgetAmount, setBudgetAmount] = useState("") // esto es culpa de Joni

    const createCategory = async () => {
        try {
            const { data: category, error: categoryError } = await budgetingService.insertCategory({
                name: description,
            });
        
            if (categoryError) throw categoryError;
        
            if (budgetAmount !== '') {
                const amount = parseInt(budgetAmount);
                const { error: budgetError } = await budgetingService.insertBudget({
                    category_id: category.id,
                    amount: amount,
                });

                if (budgetError) throw budgetError;
            }
        
        
            console.log('categoria y presupuesto creados');
            onClose(false, true);
            setDescription('');
            setBudgetAmount('');
        
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
                        setBudgetAmount('');
                        setDescription('');
                        onClose(false)}} 
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
                        placeholder="$100.000"
                        value={budgetAmount}
                        onChangeText={(text) => setBudgetAmount(text)}
                        
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
import { X } from "lucide-react-native";
import { Modal, TextInput, TouchableOpacity, View, Text } from "react-native";
import { formatCurrency } from "../../../utils/currency";
import { useState } from "react";
import { ShoppingItemsType } from "../../screens/HomeStack/DebitStack/CalculateEgressScreen";

// ModalShoppingItem.tsx
type ModalShoppingItemType = {
    visible: boolean;
    onClose: () => void;
    onAddItem: (item: ShoppingItemsType) => void;  
}

export function ModalShoppingItem({ visible, onClose, onAddItem }: ModalShoppingItemType) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState('');

    const handleAmountChange = (text: string) => {

        const cleaned = text.replace(/\D/g, '');
        const number = parseInt(cleaned) || 0;
        
        setPrice(number);                          
        setDisplayPrice(formatCurrency(number));  
    };

    const handleAdd = () => {
        if (name === '' || price <= 0) return;
    
        onAddItem({
            id: Date.now().toString(),
            name,
            price,
            quantity,
        });
    
        // limpiar
        setName('');
        setPrice(0);
        setQuantity(1);
        setDisplayPrice('');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType='fade'
            backdropColor={'rgba(0, 0, 0, 0.1)'}
        >
            <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
                <View style={{alignSelf: 'center', width: '80%', height: 320, backgroundColor: '#BAD3A2', padding: 20, borderRadius: 15, alignItems: 'center'}}>
                    <TouchableOpacity 
                    onPress={() => {
                        setDisplayPrice('');
                        setName('');
                        setPrice(0);
                        onClose();
                    }} 
                    style={{ padding: 10, position: 'absolute', top: 5, right:5 }}
                    >
                        <X size={24} color={'white'} />
                    </TouchableOpacity>

                    <Text style={{color: 'white', fontSize: 22, marginBottom: 4, fontWeight: 'bold'}}>Producto a comprar</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, marginBottom: 15 }}
                        placeholder="Producto"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <Text style={{color: 'white', fontSize: 22, marginBottom: 4, fontWeight: 'bold'}}>Valor del Producto</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18, marginBottom: 15 }}
                        placeholder={formatCurrency(0)}
                        keyboardType="numeric"
                        value={displayPrice}
                        onChangeText={handleAmountChange}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginBottom: 20}}>
                    <Text style={{color: 'white', fontSize: 22, marginBottom: 4, fontWeight: 'bold'}}>Cantidad</Text>
                        <TouchableOpacity 
                        style={{ backgroundColor: '#BAD3A2', paddingHorizontal: 10}}
                        onPress={() => setQuantity(q => Math.max(1, q - 1))}>
                            <Text style={{ fontSize: 24 }}>−</Text>
                        </TouchableOpacity>
                        
                        <Text style={{ fontSize: 20 }}>{quantity}</Text>
                        
                        <TouchableOpacity 
                        style={{ backgroundColor: '#BAD3A2', paddingHorizontal: 10}}
                        onPress={() => setQuantity(q => q + 1)}>
                            <Text style={{ fontSize: 24 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                    onPress={handleAdd} 
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
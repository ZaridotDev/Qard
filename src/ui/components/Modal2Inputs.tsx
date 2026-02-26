import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, Modal, TextInput } from "react-native";
import { transactionService } from "../../services/src/services/transactions.service";
import { getMonthRange } from "../../utils/date";
import { useState } from "react";

type Modal2InputsType = {
    visible: boolean;
    onClose: (closed: boolean, saved?: boolean) => void;
}

export function Modal2Inputs ({visible, onClose}: Modal2InputsType) {
    const [teton, setTeton] = useState("")
    const [description, setDescription] = useState("")

    const createIncome = async () => {
        const tetonInt = parseInt(teton);
        if  ( teton != '' && tetonInt > 0 && description != '') {
            try {
                const {today: piton} = getMonthRange(new Date());
                const amount = parseInt(teton);
                const transaction = await transactionService.insert({
                    type: 'income',
                    amount: amount, // traido del inut del 2do text input
                    description: description, // traido del inut del 1er text input
                    transaction_date: piton, 
                });
                
                console.log('Transaction creada', transaction);
                onClose(false, true); // cerrado y guardado → padre puede refrescar
                setTeton('');
                setDescription('');
                return;
            } catch (error) {
                console.error('Error creando transaction', error);
                onClose(false); // cierra igual para que el usuario pueda reintentar
            }
        } else if (teton === '') {
            console.log("ingresa un monto")
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
            backdropColor={'rgba(0, 0, 0, 0.3)'}
            onRequestClose={() => console.log('new Income')}
            // style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}
        >
            <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
                <View style={{alignSelf: 'center', justifyContent: 'space-between',width: '80%', height: '40%', backgroundColor: '#BAD3A2', padding: 20, borderRadius: 15, alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Descripcion</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18 }}
                        placeholder="Sueldo"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Monto</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18 }}
                        placeholder="$1000"
                        value={teton}
                        onChangeText={(text) => setTeton(text)}
                        
                    />
                    <Button onPress={() => createIncome()} title='Aceptar' color={'#5C7E3B'} />
                    <Button onPress={() => {
                        setTeton('');
                        setDescription('');
                        onClose(false)}} title='Cancelar' color={'#5C7E3B'} />
                </View>
            </View>
        </Modal>
    )
}
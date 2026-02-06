import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, Modal, TextInput } from "react-native";
import { transactionService } from "../../services/src/services/transactions.service";

type ModalIncomeType = {
    visible: boolean;
    onCLose: (res: boolean) => void;
}

export function ModalIncome ({visible, onCLose}: ModalIncomeType) {

    const createIncome = async () => {
            try {
                const today = new Date();
                // const transaction = await transactionService.insert({
                //     type: 'income',
                //     amount: 1000,
                //     description: 'Supermercado',
                //     transaction_date: '2026-03-29',
                // });
        
                // console.log('Transaction creada', transaction);
                console.log(today)
            } catch (error) {
                console.error('Error creando transaction', error);
            }
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
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Monto</Text>
                    <TextInput 
                    style={{width: '100%', backgroundColor: 'white', height: 40, textAlign: 'center', fontSize: 18 }}
                    placeholder="$1000"
                    />
                    <Button onPress={() => createIncome()} title='Aceptar' color={'#5C7E3B'} />
                    <Button onPress={() => onCLose(false)} title='Cancelar' color={'#5C7E3B'} />
                </View>
            </View>
        </Modal>
    )
}
import { View, Text, FlatList } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { PlusButton } from "../../../components/PlusButton";
import { DebitItem } from "../../../components/DebitItem";
import { useEffect, useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ModalRecurerentEgress } from "../../../components/Modals/ModalRecurrentEgress";
import { transactionService } from "../../../../services/src/services/transactions.service";
import { getMonthRange } from "../../../../utils/date";
import { useRecurringTransactions } from "../../../../hooks/useRecurringTransactions";
import { recurrentEgressService } from "../../../../services/src/services/recurrentEgress.service";
import Toast from "react-native-toast-message";
import { colors } from "../../../styles/colors";
import { formatCurrency } from "../../../../utils/currency";

export function RecurrentEgressScreen () {
    const [visible, setVisible] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const navigation = useNavigation();
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
    };

    const deleteReccurent = async (id: string) => {
        const { error } = await recurrentEgressService.deleteRecurringTransaction(id);
        if (error) {
            Toast.show({ type: 'error', text1: 'Error al eliminar' });
            return;
        }
        Toast.show({ type: 'success', text1: 'Eliminado correctamente' });
        setRefreshTrigger(t => t + 1);
    }

    const { reccurents, loading, error } = useRecurringTransactions(
        refreshTrigger
    )
    
    useEffect (() => {
        console.log(reccurents)
    }, [refreshTrigger]);

    const createExpense = async (amount: string, description: string) => {
        try {
            const { today } = getMonthRange(new Date());
            const { error } = await transactionService.insert({
                type: 'expense',
                amount: parseInt(amount), 
                description: description, 
                transaction_date: today, 
            });
            if (error) throw error;

            return;
        } catch (error) {
            Toast.show({
                type: 'info',
                text1: 'Error creando transaction',
                text2: (error as Error).message.toString()
            })
        }
    }
    

    const handleCloseModal = (closed: boolean, saved?: boolean) => {
        setVisible(false);
        if (saved) setRefreshTrigger((t) => t + 1);
    }; 

    return (
        <View style={{backgroundColor: colors[1], flex: 1}}>
            <ModalRecurerentEgress visible={visible} onClose={handleCloseModal} />
            <BackButton onClick={goHome}/>
            {/* Titulo */}
            <View 
                style={{
                    backgroundColor: colors[4], 
                    padding: 10, 
                    borderRadius: 10, 
                    alignSelf: 'center', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    elevation: 15, 
                    width: '70%',
                    marginBottom: 20,
            }}>
                <Text style={{ fontSize: 28, textAlignVertical: 'center'}}>Gastos recurrentes</Text>
            </View>
            {/* Titulo */}
            <View
                style={{
                    height: 'auto', 
                    maxHeight: '75%'

                }}
            >
                <FlatList 
                data={reccurents} 
                renderItem={({item}) => 
                    <DebitItem 
                        text={item.description} 
                        amount={formatCurrency(item.amount)} 
                        onPress={() => createExpense(item.amount, item.description)}
                        onDelete={() => deleteReccurent(item.id)}
                    />}
                keyExtractor={(item) => item.id}
                />
            </View>

            {/* Boton add Item */}
            <PlusButton onPress={() => setVisible(true)}/>
        </View>
    )
}
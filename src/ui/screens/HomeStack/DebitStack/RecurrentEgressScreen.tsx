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
            console.error('Error creando transaction', error);
        }
    }
    

    const handleCloseModal = (closed: boolean, saved?: boolean) => {
        setVisible(false);
        if (saved) setRefreshTrigger((t) => t + 1);
    }; 

    return (
        <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
            <ModalRecurerentEgress visible={visible} onClose={handleCloseModal} />
            <BackButton onClick={goHome}/>
            {/* Reutilizar BudgetItems para los items de compra */}
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
                        amount={item.amount} 
                        onPress={() => {
                            // console.log(item)
                            createExpense(item.amount, item.description)
                        }}
                    />}
                keyExtractor={(item) => item.id}
                />
            </View>

            {/* Boton add Item */}
            <PlusButton onPress={() => setVisible(true)}/>
        </View>
    )
}
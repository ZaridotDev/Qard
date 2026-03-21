import { View, Text, FlatList } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { DebitItem } from "../../../components/DebitItem";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { PlusButton } from "../../../components/PlusButton";
import { useState } from "react";
import { ModalCategories } from "../../../components/Modals/ModalCategories";
import { useGetCategories } from "../../../../hooks/useGetCategories";
import { formatCurrency } from "../../../../utils/currency";
import { WalletsStackParams } from "../../../../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import { budgetingService } from "../../../../services/src/services/budgeting.service";
import { colors } from "../../../styles/colors";

export function WalletScreen () {
    const [visible, setVisible] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    const navigation = useNavigation<StackNavigationProp<WalletsStackParams>>();
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
    };

    const { categories, loading, error } = useGetCategories(
        refreshTrigger
    );

    const handleCloseModal = (closed: boolean, saved?: boolean) => {
        setVisible(false);
        if (saved) setRefreshTrigger((t) => t + 1);
    };
    
    const deleteCategory = async (item: any) => {
        // Si tiene budget lo borrás primero
        if (item.budgets?.[0]?.id) {
            const { error: budgetError } = await budgetingService.deleteBudget(item.budgets[0].id);
            if (budgetError) {
                Toast.show({ type: 'error', text1: 'Error al eliminar el presupuesto' });
                return;
            }
        }
        const { error } = await budgetingService.deleteCategory(item.id);
        if (error) {
            Toast.show({ type: 'error', text1: 'Error al eliminar la categoría' });
            return;
        }
        Toast.show({ type: 'success', text1: 'Categoría eliminada correctamente' });
        setRefreshTrigger(t => t + 1);
    };

    return (
            <View style={{backgroundColor: colors[1], flex: 1}}>
                {/* Flatlist */}

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
                    <Text style={{ fontSize: 28, textAlignVertical: 'center'}}>Presupuestos</Text>
                </View>
                {/* Titulo */}
                <View style={{height: 'auto',maxHeight: '75%'}}>
                    <FlatList 
                    data={categories} 
                    renderItem={({item}) => 
                        <DebitItem 
                            text={item.name} 
                            amount={item.budgets?.[0]?.amount
                                ? formatCurrency(item.budgets[0].amount)
                                : ''
                            }                            
                            onPress={() => 
                                navigation.navigate('Calculator', {category: item})
                            }
                            onDelete={() => deleteCategory(item)}
                        />
                    }
                    keyExtractor={(item) => item.id}
                    />
                </View>

                {/* Flatlist */}
                <ModalCategories visible={visible} onClose={handleCloseModal} />

                <PlusButton onPress={() => setVisible(true)}/>
            </View>
    )
}
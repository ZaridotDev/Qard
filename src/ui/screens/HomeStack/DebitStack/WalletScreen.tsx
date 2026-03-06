import { View } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { DebitItem } from "../../../components/DebitItem";
import { useNavigation } from "@react-navigation/native";
import { PlusButton } from "../../../components/PlusButton";
import { useState } from "react";
import { ModalCategories } from "../../../components/Modals/ModalCategories";
import { FlatList } from "react-native-gesture-handler";
import { useGetCategories } from "../../../../hooks/useGetCategories";
import { formatCurrency } from "../../../../utils/currency";

export function WalletScreen () {
    const [visible, setVisible] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    const navigation = useNavigation();

    const { categories, loading, error } = useGetCategories(
        refreshTrigger
    );

    const handleCloseModal = (closed: boolean, saved?: boolean) => {
        setVisible(false);
        if (saved) setRefreshTrigger((t) => t + 1);
    };

    return (
            <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
                {/* Flatlist */}

                <BackButton/>
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
                                navigation.navigate('Calculator', {category: item})}/>}
                    keyExtractor={(item) => item.id}
                    />
                </View>

                {/* Flatlist */}
                <ModalCategories visible={visible} onClose={handleCloseModal} />

                <PlusButton onPress={() => setVisible(true)}/>
            </View>
    )
}
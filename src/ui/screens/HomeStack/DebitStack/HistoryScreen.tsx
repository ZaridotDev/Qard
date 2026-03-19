import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, View } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { CategoryItem } from "../../../components/CategoryItem";
import { DebitItem } from "../../../components/DebitItem";
import { useGetHistory } from "../../../../hooks/useGetHistory";
import { useCallback, useState } from "react";

export function HistoryScreen () {
    const [localRefresh, setLocalRefresh] = useState(0);
    const navigation = useNavigation();
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
    };

    const { categories, loading, error } = useGetHistory(localRefresh);

    useFocusEffect(
        useCallback(() => {
            setLocalRefresh(t => t + 1);
        }, [])
    );
    
    return (
        <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
            <BackButton onClick={goHome}/>
            <FlatList
                data={categories}
                renderItem={({item}) => 

                    
                    <CategoryItem 
                        text={item.name} 
                        transactions={item.transactions}
                    />}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}   


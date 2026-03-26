import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, Text, View } from "react-native";
import { BackButton } from "../../../../components/BackButton";
import { CategoryItem } from "../../../../components/CategoryItem";
import { useGetHistory } from "../../../../../hooks/useGetHistory";
import { useCallback, useState } from "react";
import { colors } from "../../../../styles/colors";

export function HistoryScreen () {
    const [localRefresh, setLocalRefresh] = useState(0);
    const navigation = useNavigation();
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'NavMenu' }],
            })
        );
    };

    const { categories } = useGetHistory(localRefresh);

    useFocusEffect(
        useCallback(() => {
            setLocalRefresh(t => t + 1);
        }, [])
    );
    
    return (
        <View style={{backgroundColor: colors[1], flex: 1}}>
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
                    <Text style={{ fontSize: 28, textAlignVertical: 'center'}}>Historal</Text>
                </View>
                {/* Titulo */}
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


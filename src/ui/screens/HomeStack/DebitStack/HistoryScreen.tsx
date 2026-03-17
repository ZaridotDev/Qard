import { CommonActions, useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, View } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { CategoryItem } from "../../../components/CategoryItem";
import { DebitItem } from "../../../components/DebitItem";
import { useGetHistory } from "../../../../hooks/useGetHistory";

export function HistoryScreen () {
    const navigation = useNavigation();
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
    };

    const { categories, loading, error } = useGetHistory();


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
            {/* <Pressable
            onPress={() => console.log(categories[0].transactions[0].shopping_items)}>
                <View style={{backgroundColor: 'red', width: 100, height: 100}}></View>
            </Pressable> */}
            </View>
    )
}   


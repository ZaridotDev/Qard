import { CommonActions, useNavigation } from "@react-navigation/native";
import { FlatList, View } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { CategoryItem } from "../../../components/CategoryItem";
import { DebitItem } from "../../../components/DebitItem";

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

    return (
        <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
            <BackButton onClick={goHome}/>
            <CategoryItem text="Comida"/>
            
            </View>
    )
}   
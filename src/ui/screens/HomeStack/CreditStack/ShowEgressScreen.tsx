import { View, Text, ScrollView } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { SelectMonthScreen } from "../SelectMonthScreen";
import { useState } from "react";
import { getMonthRange } from "../../../../utils/date";
import { CreditExpensesScreen } from "../CreditExpensesScreen";
import { CommonActions, useNavigation } from "@react-navigation/native";

export function ShowEgressScreen () {
    const { startCurrentMonth, endCurrentMonth } = getMonthRange(new Date());
    const [selectMonth, setSelectMonth] = useState<string[]>([startCurrentMonth, endCurrentMonth]);
    
    const navigation = useNavigation();
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
    };

    const restoreSelecetMonth = (selected: string[]) => {
        setSelectMonth(selected);
    }

    return (
        <View style={{flex: 1, backgroundColor: '#F3F7EE'}}>
            <BackButton onClick={goHome}/>
            <SelectMonthScreen selected={restoreSelecetMonth}/>
            <ScrollView style={{ padding: 24, backgroundColor: '#F3F7EE', flex: 1, paddingTop: 0}}>
                <CreditExpensesScreen  crud={() => console.log('crud')}/>
                <CreditExpensesScreen  crud={() => console.log('crud')}/>
                <CreditExpensesScreen  crud={() => console.log('crud')}/>
                <CreditExpensesScreen  crud={() => console.log('crud')}/>
            </ScrollView>
        </View>
    )
}
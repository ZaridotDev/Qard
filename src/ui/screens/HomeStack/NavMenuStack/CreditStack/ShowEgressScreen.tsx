import { View, ScrollView, FlatList } from "react-native";
import { BackButton } from "../../../../components/BackButton";
import { SelectMonth } from "../../../../components/SelectMonth";
import { useCallback, useState } from "react";
import { getMonthRange } from "../../../../../utils/date";
import { CreditExpensesScreen } from "./CreditExpensesScreen";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useGetPaymentMethods } from "../../../../../hooks/useGetPaymentMethods";
import { colors } from "../../../../styles/colors";

export function ShowEgressScreen () {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
    const { startCurrentMonth, endCurrentMonth } = getMonthRange(nextMonth);
    const [selectMonth, setSelectMonth] = useState<string[]>([startCurrentMonth, endCurrentMonth]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const navigation = useNavigation();
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'NavMenu' }],
            })
        );
    };

    useFocusEffect(
        useCallback(() => {
            setRefreshTrigger(t => t + 1);
        }, [])
    );

    const restoreSelecetMonth = (selected: string[]) => {
        setSelectMonth(selected);
    }

    const {paymentMethods} = useGetPaymentMethods(refreshTrigger)

    return (
        <View style={{flex: 1, backgroundColor: colors[1]}}>
            <BackButton onClick={goHome}/>
            <SelectMonth credit selected={restoreSelecetMonth}/>
            <ScrollView style={{ padding: 24, backgroundColor: colors[1], flex: 1, paddingTop: 0}}>
                <FlatList 
                    data={paymentMethods}
                    renderItem={({item})  => 
                        <CreditExpensesScreen  
                            title={item.alias}
                            id={item.id}
                            selectMonth={selectMonth}
                            crud={() => console.log(item)}
                        />
                    }
                    keyExtractor={(item) => item.id}
                />
            </ScrollView>
        </View>
    )
}
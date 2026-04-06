import { View } from "react-native";
import { TransactionsScreen } from "./TransactionsScreen";
import { ButtonStack } from "../../components/ButtonStack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DrawerButon } from "../../components/DrawerButon";
import { ModalIncome } from "../../components/Modals/ModalIncome";
import { useEffect, useState } from "react";
import { PlusButton } from "../../components/PlusButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParams } from "../../../types/navigation";
import { colors } from "../../styles/colors";
import { ModalExpense } from "../../components/Modals/ModalExpense";

type QuickExpenseRouteProp = RouteProp<HomeStackParams, 'Home'>;

export function HomeScreen () {
  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();
  const route = useRoute<QuickExpenseRouteProp>();
  const [visibleIncome, setVisibleIncome] = useState(false);
  const [visibleExpense, setVisibleExpense] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCloseModal = (closed: boolean, saved?: boolean) => {
    setVisibleIncome(false);
    setVisibleExpense(false);
    if (saved) setRefreshTrigger((t) => t + 1);
  };

  const crudTransaction = (crud?: boolean) => {
    if (crud) setRefreshTrigger((t) => t + 1);
  }

  useEffect(() => {
    if (route.params?.visible) {
      setVisibleExpense(true);
    }
  }, []);

  return ( 
    <View style={{ padding: 24, backgroundColor: colors[1], flex: 1, paddingTop: 20}}>
      <DrawerButon />

      <TransactionsScreen refreshTrigger={refreshTrigger} crud={crudTransaction}/>
      <ModalIncome visible={visibleIncome} onClose={handleCloseModal} />
      <ModalExpense visible={visibleExpense} onClose={handleCloseModal} />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 25, padding:8}}>
        <ButtonStack text="GASTAR"  icon expense fs={26} onPress={() => navigation.navigate('NavMenu')}/>
        {/* <PlusButton onPress={() => setVisible(true)}/> */}
        <ButtonStack text="INGRESAR"  icon fs={26} onPress={() => setVisibleIncome(true)}/>
      </View>
      
    </View>
  ); 
}
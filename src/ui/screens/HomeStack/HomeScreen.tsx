
import { View, Text, Button } from "react-native";
import { CreateTransactionScreen } from "../CreateTransactionScreen";
import { TransactionsScreen } from "./TransactionsScreen";
import { ButtonStack } from "../../components/ButtonStack";
import { useNavigation } from "@react-navigation/native";
import { DrawerButon } from "../../components/DrawerButon";
import { ModalIncome } from "../../components/ModalIncome";
import { useState } from "react";

export function HomeScreen () {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);


  return ( 
    <View style={{ padding: 24, backgroundColor: '#F3F7EE', flex: 1, paddingTop: 50}}>
      <DrawerButon />

      <TransactionsScreen />
      <ModalIncome visible={visible} onCLose={(res: boolean) => setVisible(res)}/>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <ButtonStack text="DEBITO" onPress={() => navigation.navigate('Debit')}/>
        <ButtonStack text="+" onPress={() => setVisible(true)}/>
        <ButtonStack text="CREDITO" onPress={() => navigation.navigate('Credit')}/>
      </View>
      
    </View>
  ); 
}
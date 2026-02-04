
import { View, Text, Button } from "react-native";
import { CreateTransactionScreen } from "../CreateTransactionScreen";
import { TransactionsScreen } from "./TransactionsScreen";
import { ButtonStack } from "../../components/ButtonStack";
import { useNavigation } from "@react-navigation/native";

export function HomeScreen () {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 24, backgroundColor: '#F3F7EE', flex: 1}}>
      
      
      <TransactionsScreen />
      <View style={{ height: 5 }}></View>
      {/* <CreateTransactionScreen /> */}
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <ButtonStack text="DEBITO" onPress={() => navigation.navigate('Debit')}/>
        <ButtonStack text="+" onPress={() => console.log('ABRE MODAL DE INGRESO')}/>
        <ButtonStack text="CREDITO" onPress={() => navigation.navigate('Credit')}/>
      </View>
      
    </View>
  ); 
}
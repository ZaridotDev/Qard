import { View, Text, Button, TouchableOpacity } from "react-native";
import { CreateTransactionScreen } from "../CreateTransactionScreen";
import { TransactionsScreen } from "./TransactionsScreen";
import { ButtonStack } from "../../components/ButtonStack";
import { useNavigation } from "@react-navigation/native";
import { DrawerButon } from "../../components/DrawerButon";
import { Modal2Inputs } from "../../components/Modal2Inputs";
import { useState } from "react";
import { Plus } from "lucide-react-native";

export function HomeScreen () {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCloseModal = (closed: boolean, saved?: boolean) => {
    setVisible(false);
    if (saved) setRefreshTrigger((t) => t + 1);
  };

  const crudTransaction = (crud?: boolean) => {
    if (crud) setRefreshTrigger((t) => t + 1);
  }

  return ( 
    <View style={{ padding: 24, backgroundColor: '#F3F7EE', flex: 1, paddingTop: 20}}>
      <DrawerButon />

      <TransactionsScreen refreshTrigger={refreshTrigger} crud={crudTransaction}/>
      <Modal2Inputs visible={visible} onClose={handleCloseModal} />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 25, padding:8}}>
        <ButtonStack text="DEBITO" onPress={() => navigation.navigate('Debit')}/>
        {/* <ButtonStack text="+" onPress={() => setVisible(true)}/> */}
        <TouchableOpacity
          style={{ alignItems: 'center', marginTop: 40}}
          onPress={() => setVisible(true)}
          activeOpacity={0.8}
        >
          <View 
          style={{
            width: 50, 
            height: 50, 
            borderRadius: 15, 
            backgroundColor: '#D9E7CB', 
            justifyContent: 'center', 
            alignItems: 'center',
            elevation: 5,
            bottom: 15
            }}
          >
            <Plus />
          </View>
        </TouchableOpacity>
        <ButtonStack text="CREDITO" onPress={() => navigation.navigate('Credit')}/>
      </View>
      
    </View>
  ); 
}
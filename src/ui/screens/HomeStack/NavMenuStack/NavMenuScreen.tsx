import { View, Text } from "react-native";
import { useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ModalRecurerentEgress } from "../../../components/Modals/ModalRecurrentEgress";
import Toast from "react-native-toast-message";
import { colors } from "../../../styles/colors";
import { ButtonStack } from "../../../components/ButtonStack";
import { Separator } from "../../../components/Separator";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavMenuStackParams } from "../../../../types/navigation";

export function NavMenuScreen () {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation<StackNavigationProp<NavMenuStackParams>>();
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
    };


    const handleCloseModal = (closed: boolean, saved?: boolean) => {
        setVisible(false);
        // if (saved) setRefreshTrigger((t) => t + 1);
    }; 

    return (
        <View style={{backgroundColor: colors[1], flex: 1, paddingTop: 40}}>
            <ModalRecurerentEgress visible={visible} onClose={handleCloseModal} />
            {/* <BackButton onClick={goHome}/> */}
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
                    // width: '70%',
                    marginBottom: 20,
            }}>
                <Text style={{ fontSize: 28, textAlignVertical: 'center'}}>Gastos recurrentes</Text>
            </View>
            {/* Titulo */}
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    // height: 'auto', 
                    maxHeight: '75%'

                }}
            >
                <ButtonStack isFullWidth ctr fs={24} text={'Gasto rápido'} onPress={() => navigation.navigate('QuickExpense')}/>
                <ButtonStack isFullWidth ctr fs={24} text={'Tarjetas'} onPress={() => navigation.navigate('Credit')}/>
                <ButtonStack isFullWidth ctr fs={24} text={'Gastos recurrentes'} onPress={() => navigation.navigate('Recurrents')}/>
                <ButtonStack isFullWidth ctr fs={24} text={'Presupuestos'} onPress={() => navigation.navigate('Wallets')}/>
                <ButtonStack isFullWidth ctr fs={24} text={'Historial'} onPress={() => navigation.navigate('History')}/>
                <Separator hg={80} wd={'100%'}/>
                <ButtonStack  text={'Volver al Inicio'} onPress={goHome}/>
            </View>
        </View>
    )
}
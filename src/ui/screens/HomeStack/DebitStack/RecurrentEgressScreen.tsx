import { View, Text } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { PlusButton } from "../../../components/PlusButton";
import { DebitItem } from "../../../components/DebitItem";
import { useState } from "react";
import { ModalIncome } from "../../../components/Modals/ModalIncome";

export function RecurrentEgressScreen () {
    const [visible, setVisible] = useState(false);


    const handleCloseModal = (closed: boolean, saved?: boolean) => {
        setVisible(false);
    };

    return (
        <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
            <ModalIncome visible={visible} onClose={handleCloseModal} />
            <BackButton/>
            {/* Reutilizar BudgetItems para los items de compra */}
            
            <DebitItem text="mermelada" amount="$0.000"/>
            <DebitItem text="pan" amount="$0.000"/>
            <DebitItem text="leche" amount="$0.000"/>

            {/* Boton add Item */}
            <PlusButton onPress={() => setVisible(true)}/>
        </View>
    )
}
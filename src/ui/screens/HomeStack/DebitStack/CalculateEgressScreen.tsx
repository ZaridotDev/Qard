import { View, Text, Button, TouchableOpacity } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { Plus } from "lucide-react-native";
import { BudgetItem } from "../../../components/BudgetItem";

export function CalculateEgressScreen () {

    return (
        <View>
            <BackButton/>
            {/* View de totales */}
            <View style={{width: '80%', height: 150, backgroundColor: "#93B771", alignSelf: 'center', borderRadius:15, marginBottom: 50, paddingTop: 10, alignItems: 'center'}}>
                <Text style={{ fontSize: 20, color: 'white'}}>Budget</Text>
                <Text style={{ fontSize: 50, color: 'white'}}>$150.000</Text>
                <Text style={{ fontSize: 30, color: 'white'}}>$13.000</Text>
            </View>
            {/* Reutilizar BudgetItems para los items de compra */}

            <BudgetItem/>
            <BudgetItem/>
            <BudgetItem/>
            {/* Boton add Item */}
            <TouchableOpacity 
                    style={{ alignItems: 'center', marginTop: 40}}
                    onPress={() => console.log('hola')}
                >
                    <View 
                    style={{
                        width: 50, 
                        height: 50, 
                        borderRadius: 15, 
                        backgroundColor: '#D9E7CB', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        elevation: 10,  
                        }}
                    >
                        <Plus />
                    </View>
                </TouchableOpacity>
            {/* Boton Comprar */}
        </View>
    )
}
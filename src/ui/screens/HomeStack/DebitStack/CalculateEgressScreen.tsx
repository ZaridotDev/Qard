import { View, Text, TouchableOpacity } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { Plus } from "lucide-react-native";
import { DebitItem } from "../../../components/DebitItem";

// deberia renderizar lo que pase el boton por las props
export function CalculateEgressScreen () {

    return (
        <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
            <BackButton/>
            {/* View de totales */}
            <View style={{width: '80%', height: 150, backgroundColor: "#93B771", alignSelf: 'center', borderRadius:15, marginBottom: 50, paddingTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 22, color: 'white'}}>Budget</Text>
                <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold'}}>$150.000</Text>
                <Text style={{ fontSize: 30, color: 'white'}}>$13.000</Text>
            </View>
            {/* Reutilizar BudgetItems para los items de compra */}
            
            <DebitItem text="mermelada" amount="$0.000"/>
            <DebitItem text="pan" amount="$0.000"/>
            <DebitItem text="leche" amount="$0.000"/>
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
            <TouchableOpacity 
            onPress={() => console.log('comprar')}
            activeOpacity={0.9}
            style={{width: '60%', height: 50, alignSelf: 'center', justifyContent: 'flex-end', position: 'absolute', bottom: 50}}>
                <View style={{backgroundColor: '#5C7E3B', flex: 1, alignContent: 'center', justifyContent: 'center', borderRadius: 15, alignItems: 'center', elevation: 10,}}>
                    <Text style={{color: 'white', fontSize: 24}}>Comprar</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
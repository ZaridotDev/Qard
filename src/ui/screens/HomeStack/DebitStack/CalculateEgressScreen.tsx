import { View, Text, TouchableOpacity } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { DebitItem } from "../../../components/DebitItem";
import { PlusButton } from "../../../components/PlusButton";
import { useRoute, RouteProp } from '@react-navigation/native';
import { WalletsStackParams } from '../../../../types/navigation';
import { formatCurrency } from "../../../../utils/currency";

type CalculatorRouteProp = RouteProp<WalletsStackParams, 'Calculator'>;
// deberia renderizar lo que pase el boton por las props
export function CalculateEgressScreen () {
    const route = useRoute<CalculatorRouteProp>();
    const { category } = route.params;

    return (
        <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
            <BackButton/>
            {/* View de totales */}
            { category.budgets[0]?.amount 
            ? <View style={{width: '80%', height: 150, backgroundColor: "#93B771", alignSelf: 'center', borderRadius:15, marginBottom: 50, paddingTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 22, color: 'white'}}>{category.name}</Text>
                <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold'}}>{formatCurrency(category.budgets[0]?.amount)}</Text>
                <Text style={{ fontSize: 30, color: 'white'}}>Sumas</Text>
            </View>
            : <View style={{width: '80%', height: 150, backgroundColor: "#93B771", alignSelf: 'center', borderRadius:15, marginBottom: 50, paddingTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 22, color: 'white'}}>{category.name}</Text>
                <Text style={{ fontSize: 22, color: 'white'}}>Sin Presupuesto</Text>
                <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold'}}>Sumas</Text>
            </View>
            }
            {/* Reutilizar BudgetItems para los items de compra */}
            
            <DebitItem text="mermelada" amount="$0.000"/>
            <DebitItem text="pan" amount="$0.000"/>
            <DebitItem text="leche" amount="$0.000"/>
            {/* Boton add Item */}
            <PlusButton onPress={() => console.log('add Item')}/>
            {/* Boton Comprar */}
            <TouchableOpacity 
                onPress={() => console.log('comprar')}
                activeOpacity={0.9}
                style={{
                    width: '60%', 
                    height: 50, 
                    alignSelf: 'center', 
                    justifyContent: 'flex-end',
                    position: 'absolute', 
                    bottom: 50,
            }}>
                <View 
                style={{
                    backgroundColor: '#5C7E3B', 
                    flex: 1, 
                    alignContent: 'center', 
                    justifyContent: 'center', 
                    borderRadius: 15, 
                    alignItems: 'center', 
                    elevation: 10,
                }}>
                    <Text style={{color: 'white', fontSize: 24}}>Comprar</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
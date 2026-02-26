import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { CategoryItem } from "../../../components/CategoryItem";
import { DebitItem } from "../../../components/DebitItem";

export function HistoryScreen () {
    const navigation = useNavigation();

    return (
        <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
            <BackButton/>
            {/* <Button onPress={() => navigation.navigate('Details')} title={"Detalle"}/> */}
            <CategoryItem text="Comida"/>       
            <DebitItem text="Coto" amount="$000.000" onPress={() => navigation.navigate('Details')}/>
            <DebitItem text="Chino" amount="$000.000" onPress={() => navigation.navigate('Details')}/>
            <DebitItem text="Carniceria" amount="$000.000" onPress={() => navigation.navigate('Details')}/>
            <CategoryItem text="Gatos"/>       
            <DebitItem text="Piedritas" amount="$000.000" onPress={() => navigation.navigate('Details')}/>
            <DebitItem text="Comida" amount="$000.000" onPress={() => navigation.navigate('Details')}/>
            <CategoryItem text="Antojos"/>       
            <DebitItem text="Mc" amount="$000.000" onPress={() => navigation.navigate('Details')}/>
            <DebitItem text="Super" amount="$000.000" onPress={() => navigation.navigate('Details')}/>
            <DebitItem text="Licuados" amount="$000.000" onPress={() => navigation.navigate('Details')}/>
        </View>
    )
}   
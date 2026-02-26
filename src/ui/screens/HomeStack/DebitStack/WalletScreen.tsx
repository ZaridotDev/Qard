import { View, TouchableOpacity } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { DebitItem } from "../../../components/DebitItem";
import { useNavigation } from "@react-navigation/native";
import { PlusButton } from "../../../components/PlusButton";

export function WalletScreen () {
    
    const navigation = useNavigation();

    return (
            <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
                {/* Flatlist */}

                <BackButton/>

                <DebitItem text="comida" amount="$200.000" onPress={() => navigation.navigate('Calculator')}/>
                <DebitItem text="gatos" amount="$50.000" onPress={() =>  navigation.navigate('Calculator')}/>
                <DebitItem text="antojos" amount="$30.000" onPress={() =>  navigation.navigate('Calculator')}/>
                
                {/* Flatlist */}

                <PlusButton onPress={() => console.log('add Budget')}/>
            </View>
    )
}
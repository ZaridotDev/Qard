import { View, TouchableOpacity } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { Plus } from "lucide-react-native";
import { BudgetItem } from "../../../components/BudgetItem";

export function WalletScreen () {

    return (
            <View style={{backgroundColor: '#BAD3A2', flex: 1}}>
                {/* Flatlist */}
                <BackButton/>
                <BudgetItem/>
                <BudgetItem/>
                <BudgetItem/>
                {/* Flatlist */}

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
            </View>
    )
}
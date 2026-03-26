import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import { MoveDownRight, MoveUpRight, TrendingDown, TrendingUp } from "lucide-react-native";

type ButtonStackType = {
    text: string;
    onPress: () => void;
    bt?: number;
    fs?: number;
    expense?: boolean;
    isFullWidth?: boolean;
    icon?: boolean;
    ctr?: boolean;
}
export function ButtonStack ({text, onPress, bt, fs, expense, isFullWidth, icon, ctr}: ButtonStackType) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={{ 
                backgroundColor: expense ? colors.expense : colors[4], 
                width: isFullWidth ? '70%' : 'auto', 
                padding: 15, 
                borderRadius: 10, 
                marginTop: 20, 
                alignSelf: 'center',
                elevation: 5,
                marginBottom: bt ? bt : 0,
            }}>
            <View style={{flexDirection: 'row', justifyContent: ctr ? 'center' : 'space-between', alignItems: 'center', alignContent: 'center'}}>
                <Text style={{fontSize: fs ? fs : 20,}}>{text}</Text>
                { icon ?
                    expense 
                    ? <MoveDownRight size={18} color={colors[10]} style={{top: 2, left: 4}}/>
                    : <MoveUpRight size={18} color={colors[10]} style={{top: 2, left: 4}}/>
                : null
                }
            </View>
        </TouchableOpacity>
    )
}
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";

export function DrawerButon () {
    return (
        <View style={{ backgroundColor: '#ecf4e4', position: 'absolute', borderRadius: 10, top: 20, left: 5}}>
            <DrawerToggleButton /> {/* ReBambis */}
        </View>
    )
}
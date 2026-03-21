import { DrawerToggleButton } from "@react-navigation/drawer";
import { View } from "react-native";
import { colors } from "../styles/colors";

export function DrawerButon () {
    return (
        <View style={{ backgroundColor: colors[3], position: 'absolute', borderRadius: 20, top: 5, left: 10, paddingVertical: 4}}>
            <DrawerToggleButton /> {/* ReBambis */}
        </View>
    )
}
import { View, Text } from "react-native";
import { DrawerButon } from "../../components/DrawerButon";

export function AnalyticsScreen () {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <DrawerButon/>
            <Text style={{ fontSize: 20, padding: 10, textAlign: 'center'}}>Debemos analizar tus datos un tiempo para poder brindarte métricas</Text>
        </View>
    )
}
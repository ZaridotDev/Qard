import { View, Text } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { TransactionsScreen } from "../TransactionsScreen";

export function ShowEgressScreen () {
    return (
        <View style={{ padding: 24, backgroundColor: '#F3F7EE', flex: 1, paddingTop: 0}}>
            <BackButton/>
            <TransactionsScreen  crud={() => console.log('crud')}/>
            <TransactionsScreen  crud={() => console.log('crud')}/>
        </View>
    )
}
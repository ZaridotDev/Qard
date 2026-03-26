import { View, DimensionValue } from "react-native";

type SeparatorType = {
    hg: DimensionValue;
    wd: DimensionValue;
}

export function Separator ({hg, wd}: SeparatorType) {
    return (
        <View style={{height: hg, width: wd}}/>
    )
}
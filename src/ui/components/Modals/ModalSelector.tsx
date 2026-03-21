import { FlatList, Modal, TouchableOpacity, Text, View } from "react-native";
import { useGetCategories } from "../../../hooks/useGetCategories";
import { useCallback, useState } from "react";
import { colors } from "../../styles/colors";
import { useGetPaymentMethods } from "../../../hooks/useGetPaymentMethods";
import { useFocusEffect } from "@react-navigation/native";

type ModalSelectorType = {
    visible: boolean;
    cards?: boolean
    onClose: (closed: boolean, item?: {id: string, name: string}) => void;
}

export type itemSelectedType = {
    id: string;
    name: string;
}

export function ModalSelector ({visible, cards, onClose}: ModalSelectorType) {
    const [localRefresh, setLocalRefresh] = useState(0);

    const { categories } = useGetCategories(
        localRefresh
    );
    const { paymentMethods } = useGetPaymentMethods(
        localRefresh
    );

    useFocusEffect(
        useCallback(() => {
            setLocalRefresh(t => t + 1);
            console.log(categories.length)
        }, [])
    );

    const itemToReturn = (item: itemSelectedType) => {
        onClose(false, item)
    }

    return (
        <Modal
            visible={visible}
            animationType='fade'
            backdropColor={'rgba(0, 0, 0, 0.1)'}
        >
            <TouchableOpacity 
                onPress={() => onClose(false)}
                activeOpacity={1}
                style={{flex: 1, justifyContent: 'center', width: '70%', height: 'auto', alignSelf: 'center'}}>
                <View
                    style={{
                        backgroundColor: colors[7], 
                        justifyContent: 'center', 
                        width: '100%', 
                        alignContent: 'center',
                        padding: 10,
                        borderRadius: 10,
                    }}
                >
                    {
                        categories.length != 0
                        ?
                        <FlatList
                        data={cards ? paymentMethods : categories}
                        renderItem={({item}) => 
                            <TouchableOpacity 
                                onPress={() => itemToReturn(item)}
                                activeOpacity={0.9}
                                style={{ 
                                    width: '100%', 
                                    backgroundColor: 'white', 
                                    height: 40, 
                                    marginVertical: 4,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingLeft: 8,
                                    borderRadius: 5
                                }}
                                >
                                <Text style={{color: 'grey', fontSize: 20, bottom: 2}}>{cards ? item.alias : item.name}</Text>
                            </TouchableOpacity> 
                        }
                        keyExtractor={(item) => item.id}
                        />
                        :
                        categories.length == 0 
                        ?
                        <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>Agrega presupuestos para poder seleccionar alguno...</Text>
                        :
                        <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>Agrega Tarjetas para poder seleccionar alguna...</Text>
                    }
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
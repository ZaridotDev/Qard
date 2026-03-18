import { FlatList, Modal, TouchableOpacity, Text, View } from "react-native";
import { useGetCategories } from "../../../hooks/useGetCategories";
import { useState } from "react";
import { colors } from "../../styles/colors";
import { useGetPaymentMethods } from "../../../hooks/useGetPaymentMethods";

type ModalSelectorType = {
    visible: boolean;
    cards?: boolean
    onClose: (closed: boolean, item?: {id: string, name: string}) => void;
}

export type itemSelectedType = {
    id: string;
    name: string;
}
// export type CatgorySelectedType = {
//     id: string;
//     name: string;
// }
// export type PaymentMethodSelectedType = {
//     id: string;
//     alias: string;
// }

export function ModalSelector ({visible, cards, onClose}: ModalSelectorType) {

    const { categories } = useGetCategories();
    const { paymentMethods } = useGetPaymentMethods();

    const itemToReturn = (item: itemSelectedType) => {
        // if (cards) {
        //     let category = {
        //         id: item.id,
        //         name: item.name
        //     }
        //     onClose(false, category)
        // } else {
        //     let paymentMethod = {
        //         id: item.id,
        //         alias: item.alias
        //     }
        //     onClose(false, paymentMethod)

        // }
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
                                    marginBottom: 8,
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
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
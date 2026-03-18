import { FlatList, Modal, TouchableOpacity, Text, View } from "react-native";
import { useGetCategories } from "../../../hooks/useGetCategories";
import { useState } from "react";
import { colors } from "../../styles/colors";

type ModalSelectorType = {
    visible: boolean;
    onClose: (closed: boolean, category?: CatgorySelectedType) => void;
}

export type CatgorySelectedType = {
    id: string;
    name: string;
}

export function ModalSelector ({visible, onClose}: ModalSelectorType) {

    const { categories, loading, error } = useGetCategories();

    return (
        <Modal
            visible={visible}
            animationType='fade'
            backdropColor={'rgba(0, 0, 0, 0.1)'}
        >
            <TouchableOpacity 
                onPress={() => onClose(false)}
                activeOpacity={1}
                style={{flex: 1, justifyContent: 'center', width: '70%', height: 'auto', alignSelf: 'center', marginTop: 100,}}>
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
                        data={categories}
                        renderItem={({item}) => 
                            <TouchableOpacity 
                                onPress={() => {
                                    let category: CatgorySelectedType = {
                                        id: item.id,
                                        name: item.name
                                    }
                                    onClose(false, category)
                                }}
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
                                <Text style={{color: 'grey', fontSize: 20, bottom: 2}}>{item.name}</Text>
                            </TouchableOpacity> 
                        }
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
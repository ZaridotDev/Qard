import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { CatgorySelectedType, ModalSelector } from "./Modals/ModalSelector";

type SelectorType = {
    title: string;
    placeholder: string;
    idCategory?: (id: string) => void;
}

export function Selector ({title,placeholder, idCategory}: SelectorType) {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(placeholder);

    // useEffect (() => {
    //     setSelected(placeholder);
    //     console.log(selected)
    // }, [selected])


    const handleCloseModal = (closed: boolean, category?: CatgorySelectedType) => {
        setVisible(false);
        console.log(category)
        setSelected(category ? category.name : placeholder);
        if (idCategory) category ? idCategory(category.id) : '';
    };

    return (
        <View
            style={{justifyContent: 'center', width: '100%', marginBottom: 15}}
        >
            <ModalSelector visible={visible} onClose={handleCloseModal} />
            <Text style={{color: 'white', fontSize: 22, marginBottom: 4, fontWeight: 'bold', textAlign: 'center'}}>{title}</Text>
            <TouchableOpacity 
                onPress={() => setVisible(true)}
                activeOpacity={0.9}
                style={{ 
                    width: '100%', 
                    backgroundColor: 'white', 
                    height: 40, 
                    marginBottom: 15,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 8,
                    paddingTop: 2
                }}
            >
                <Text style={{color: 'grey', fontSize: 18, bottom: 2}}>{selected}</Text>
                <ChevronDown color={'grey'}/>
            </TouchableOpacity> 
            
        </View>
    )
}
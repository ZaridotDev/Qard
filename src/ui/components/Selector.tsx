import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { ModalSelector } from "./Modals/ModalSelector";
import { colors } from "../styles/colors";

type SelectorType = {
    title: string;
    placeholder: string;
    center?: boolean;
    cards?: boolean;
    fs: number;
    idCategory?: (id: string) => void;
    idPaymentMethod?: (id: string) => void;
}

export function Selector ({ title, placeholder, center, fs, cards, idCategory, idPaymentMethod}: SelectorType) {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(placeholder);



    const handleCloseModal = (closed: boolean, item) => {
        setVisible(false);
        if (idCategory) {
            item ? idCategory(item.id) : '';
            setSelected(item ? item.name : placeholder);
        }
        if (idPaymentMethod) {
            item ? idPaymentMethod(item.id) : '';
            setSelected(item ? item.alias : placeholder);
        }
    };

    return (
        <View
            style={{justifyContent: 'center', width: '100%', marginBottom: 15}}
        >
            <ModalSelector cards={cards} visible={visible} onClose={handleCloseModal} />
            <Text style={{color: 'white', fontSize: fs, marginBottom: 4, fontWeight: 'bold', textAlign: center ? 'center' : 'left'}}>{title}</Text>
            <TouchableOpacity 
                onPress={() => setVisible(true)}
                activeOpacity={0.9}
                style={{ 
                    width: '100%', 
                    backgroundColor: 'white', 
                    height: 40, 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 8,
                    paddingTop: 2,
                    borderRadius: 10,
                }}
            >
                <Text style={{color: colors.placeholder, fontSize: 18, bottom: 2}}>{selected}</Text>
                <ChevronDown color={'grey'}/>
            </TouchableOpacity> 
            
        </View>
    )
}
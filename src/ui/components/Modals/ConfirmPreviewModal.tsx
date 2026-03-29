import { View, Text, Modal, TouchableOpacity } from "react-native";
import { colors } from "../../styles/colors";
import { X } from "lucide-react-native";
import { JSX } from "react";

type ConfirmPreviewModalType = {
    visible: boolean;
    onClose: () => void;
    data: JSX.Element;
    confirm: () => void;
}

export function ConfirmPreviewModal ({visible, data, onClose, confirm}: ConfirmPreviewModalType) {


    return (
        <Modal
            visible={visible}
            animationType='fade'
            backdropColor={'rgba(0, 0, 0, 0.1)'}
        >
            <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
                <View style={{alignSelf: 'center', width: '90%', backgroundColor: colors[4], padding: 10, borderRadius: 15, alignItems: 'center', maxHeight: '70%' }}>
                <TouchableOpacity 
                    onPress={() => {
                        onClose();
                    }} 
                    style={{ padding: 10, position: 'absolute', top: 5, right:5 }}
                >
                    <X size={24} color={'white'} />
                </TouchableOpacity>

                <Text style={{color: 'white', fontSize: 22, marginBottom: 10, fontWeight: 'bold' }}>Confirmar compra</Text>
                <View>{data}</View>
                {/* <Text style={{color: colors[6], fontSize: 20, marginBottom: 4, textAlign: 'center', textAlignVertical: 'center', height: 'auto'}}>{data}</Text> */}

                <TouchableOpacity 
                    onPress={confirm} 
                    style={{backgroundColor: colors[6], padding: 8, borderRadius: 10, bottom: 0}}
                >
                        <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Realizar compra</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
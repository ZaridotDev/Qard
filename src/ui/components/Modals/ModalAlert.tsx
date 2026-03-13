import { View, Text, Modal, TouchableOpacity } from "react-native";

type ModalAlertType = {
    visible: boolean;
}

export function ModalAlert ({visible}: ModalAlertType) {


    return (
        <Modal
            visible={visible}
            animationType='fade'
            backdropColor={'rgba(0, 0, 0, 0.1)'}
        >
            <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
                <View style={{alignSelf: 'center', width: '80%', height: 300, backgroundColor: '#BAD3A2', padding: 20, borderRadius: 15, alignItems: 'center'}}>

                    <Text style={{color: 'white', fontSize: 22, marginBottom: 10, fontWeight: 'bold' }}>Seguro que quieres salir?</Text>
                    <Text style={{color: '#5C7E3B', fontSize: 20, marginBottom: 4, flex: 1, textAlign: 'center', textAlignVertical: 'center'}}>Deseas regresar perdiendo tu compra actual?</Text>


                    <View style={{flexDirection: 'row', alignItems: "center", justifyContent: 'space-around', width: '100%'}}> 
                        <TouchableOpacity 
                        // onPress={} 
                        >
                            <View style={{backgroundColor: '#5C7E3B', padding: 8, borderRadius: 10,}}>
                                <Text style={{color: 'white', fontSize: 20}}>Volver</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        // onPress={ } 
                        >
                            <View style={{backgroundColor: '#5C7E3B', padding: 8, borderRadius: 10, bottom: 0}}>
                                <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Seguir {'\n'}comprando</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
import { View, Text } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { ButtonStack } from "../../../components/ButtonStack";

export function AddCardScreen () {
    return (
        <View style={{ padding: 24, backgroundColor: '#F3F7EE', flex: 1, paddingTop: 0, alignContent: 'center'}}>
            <BackButton/>
            {/* Titulo */}
            <View 
                style={{
                    backgroundColor: '#BAD3A2', 
                    padding: 10, 
                    borderRadius: 10, 
                    alignSelf: 'center', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    elevation: 15, 
                    width: '80%',
                    marginBottom: 20,
            }}>
                <Text style={{ fontSize: 28, textAlignVertical: 'center'}}>Cargar Tarjeta</Text>
            </View>
            {/* Formulario */}
            <View style={{backgroundColor: '#BAD3A2', padding: 10, flex: 3, borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', elevation: 15, width: '95%'}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center'}}>Formulario</Text>
            </View>
            {/* Boton de cargar Emisor */}
            <ButtonStack text={'Añadir Emisor'} onPress={() => console.log('hola')}/>
        </View>
    )
}
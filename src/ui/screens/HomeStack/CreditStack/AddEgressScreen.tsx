import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { ButtonStack } from "../../../components/ButtonStack";
import { useMemo, useState } from "react";
import { Square, SquareCheckBig } from "lucide-react-native";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";

export function AddEgressScreen () {
    const [ paid, setPaid ] = useState(false);
    const [selectedId, setSelectedId] = useState<string | undefined>();
    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: '25%',
            value: '25',
            containerStyle: { flexDirection: 'column', alignItems: 'center' },
            color: 'white'
        },
        {
            id: '2',
            label: '50%',
            value: '50',
            containerStyle: { flexDirection: 'column', alignItems: 'center' },
            color: 'white'
        },
        {
            id: '3', // acts as primary key, should be unique and non-empty string
            label: '75%',
            value: '75',
            containerStyle: { flexDirection: 'column', alignItems: 'center' },
            color: 'white'
        },
        {
            id: '4',
            label: '100%',
            value: '100',
            containerStyle: { flexDirection: 'column' },
            color: 'white'
        }
    ]), []);
    
    return (
        <View style={{ backgroundColor: '#F3F7EE', flex: 1, paddingTop: 0, alignContent: 'center'}}>
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
                    width: '70%',
                    marginBottom: 20,
            }}>
                <Text style={{ fontSize: 28, textAlignVertical: 'center'}}>Cargar egreso</Text>
            </View>
            {/* Formulario */}
            <View style={{flex: 1, paddingTop: 20, width: '100%'}}>
                <ScrollView 
                contentContainerStyle={{ paddingBottom: paid ? 25 : 0 }}
                style={{backgroundColor: '#BAD3A2', padding: 12, maxHeight: paid ? '100%' : '80%', borderRadius: 10, alignSelf: 'center',  elevation: 15, width: '85%', paddingBottom: 100}}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Metodo de pago</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder="Seleccionar emisor"
                        // value={description}
                        // onChangeText={(text) => setDescription(text)}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Egreso</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder="$"
                        // value={teton}
                        // onChangeText={(text) => setTeton(text)}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Cantidad de cuotas</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder="1, 3, 6, 9 ..."
                        // value={description}
                        // onChangeText={(text) => setDescription(text)}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Descripcion</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder="Titulo de la compra"
                        // value={teton}
                        // onChangeText={(text) => setTeton(text)}
                        
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center'}}>Pagar con otra persona</Text>
                        <TouchableOpacity style={{ marginHorizontal: 8,padding: 10, top: 2}} onPress={() => setPaid(!paid)}>
                            {!paid 
                            ? <Square size={24} color={'white'} />
                            : <SquareCheckBig size={24} color={'white'} />
                            }
                        </TouchableOpacity>
                    </View>
                    { paid 
                    ? <>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Nombre</Text>
                        <TextInput 
                            style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                            placeholderTextColor={'#999'}
                            placeholder="Nombre de la persona"
                            // value={description}
                            // onChangeText={(text) => setDescription(text)}
                        />
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Cuanto pagara esa persona?</Text>
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={setSelectedId}
                            selectedId={selectedId}
                            // layout='row'
                            containerStyle={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}
                            labelStyle={{ left: -5, color: 'white', fontSize: 16, fontWeight: 'bold'}}
                        />
                    </>
                    : <></>}
                </ScrollView>
            </View>
            {/* Boton de cargar egreso */}
            <View style={{backgroundColor: 'transparent'}}>
                <ButtonStack text={'Añadir egreso'} onPress={() => console.log('hola')} bt={20}/>
            </View>
        </View>
    )
}
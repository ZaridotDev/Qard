import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { ButtonStack } from "../../../components/ButtonStack";
import { useState } from "react";
import { CreditCard, User } from "lucide-react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";

export function AddCardScreen () {
    const [ method, setMethod ] = useState(false);
    const [ person, setPerson ] = useState(false);
    const [ card, setCard ] = useState(true);

    const navigation = useNavigation()
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
    };
    return (
        <View style={{ backgroundColor: '#F3F7EE', flex: 1, alignContent: 'center'}}>
            <BackButton onClick={goHome}/>

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
                <Text style={{ fontSize: 28, textAlignVertical: 'center'}}>Cargar Tarjeta</Text>
            </View>
            {/* Titulo */}

            {/* Formulario */}
            <View style={{flex: 1, paddingTop: 20, width: '100%' }}>
                 {/* Tarjetas */}
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity 
                    style={{ 
                        backgroundColor: '#BAD3A2', 
                        borderTopStartRadius: 10, 
                        borderTopEndRadius: 10, 
                        padding: 4, 
                        width: 50, 
                        alignItems: 'center'}}
                    onPress={() => setCard(true)}
                    >
                        <CreditCard size={28} color={'#fff'}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{ 
                        backgroundColor: '#BAD3A2', 
                        borderTopStartRadius: 10, 
                        borderTopEndRadius: 10, 
                        padding: 4, 
                        width: 50, 
                        alignItems: 'center'}}
                    onPress={() => setPerson(true)}
                    >
                        <User size={28} color={'#fff'}/>
                    </TouchableOpacity>
                </View>
                {/* Tarjetas */}

                {/* Sombras */}
                <TouchableOpacity onPress={() => {setPerson(false), setCard(true)}} style={{elevation: 15, backgroundColor: "rgba(0,0,0,0.2)", position: 'absolute', height: 35, width:50, zIndex: card ? -1 : 0, borderTopStartRadius: 10, borderTopEndRadius: 10, right: '50%', top: 20}}/>
                <TouchableOpacity onPress={() => {setPerson(true), setCard(false)}} style={{elevation: 15, backgroundColor: "rgba(0,0,0,0.2)", position: 'absolute', height: 35, width:50, zIndex: person ? -1 : 0, borderTopStartRadius: 10, borderTopEndRadius: 10, left: '50%', top: 20}}/>
                <View style={{elevation: 15, backgroundColor: "rgba(0,0,0,0.2)", position: 'absolute', height: '80%', width: '85%', bottom: 35, zIndex: 0, borderRadius: 10, alignSelf: 'center'}}/>
                {/* Sombras */}

                <ScrollView 
                contentContainerStyle={{ paddingBottom: 25 }}
                style={{
                    backgroundColor: '#BAD3A2', 
                    padding: 12, 
                    maxHeight: '86%', 
                    borderRadius: 10, 
                    alignSelf: 'center', 
                    width: '85%', 
                }}>

                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{card ? 'Nombre de la tarjeta' : 'Nombre de la persona'}</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder={ card ? "Alias de la tarjeta" : "Nombre de quien pagara"}
                        // value={description}
                        // onChangeText={(text) => setDescription(text)}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{card ?'Cierre de la tarjeta' : ''}</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder="Fecha de inicio de facturacion (aprox)"
                        // value={teton}
                        // onChangeText={(text) => setTeton(text)}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Vencimiento de la tarjeta</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder="Fecha limite para pagar resumen (aprox)"
                        // value={description}
                        // onChangeText={(text) => setDescription(text)}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Limite de la tarjeta</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder="Limite crediticio de la tarjeta (aprox)"
                        // value={teton}
                        // onChangeText={(text) => setTeton(text)}
                        
                    />
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Cuanto deseas gastar?</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput 
                            style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                            placeholderTextColor={'#999'}
                            placeholder={method ? 'limite monetario' : 'limite en porcentaje'}
                            // value={teton}
                            // onChangeText={(text) => setTeton(text)}
                            
                        />
                        <TouchableOpacity style={{ marginHorizontal: 8, padding: 10, top: 0, position: 'absolute', right: 0}} onPress={() => setMethod(!method)}>
                            {!method 
                            ? <Text>%</Text>
                            : <Text>$</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    {/* { paid 
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
                    </>
                    : <></>} */}
                </ScrollView>
            </View>
            {/* Boton de cargar Emisor */}
            <ButtonStack text={'Añadir Emisor'} onPress={() => console.log('hola')} bt={20}/>
        </View>
    )
}
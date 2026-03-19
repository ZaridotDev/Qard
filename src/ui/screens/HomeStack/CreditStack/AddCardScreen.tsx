import { View, Text, ScrollView, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { ButtonStack } from "../../../components/ButtonStack";
import { useState } from "react";
import { CreditCard, User } from "lucide-react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { formatCurrency } from "../../../../utils/currency";
import { paymentMethodsService } from "../../../../services/src/services/paymentMethods.service";
import Toast from "react-native-toast-message";

export function AddCardScreen () {
    const [ method, setMethod ] = useState(false);
    const [ person, setPerson ] = useState(false);
    const [ card, setCard ] = useState(true);
    const [form, setForm] = useState({
        name: '',
        lastDigits: '',
        closingDay: '',
        dueDay: '',
        creditLimit: 0,
        personalLimit: 0,
    });
    const [displayCreditLimit, setDisplayCreditLimit] = useState('')
    const [displayPersonalLimit, setDisplayPersonalLimit] = useState('')

    const navigation = useNavigation()
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
    };

    const updateForm = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const insertCard = async () => {
        if (card ? form.name != '' && form.lastDigits != '' : form.name != '' ) {
            if (parseInt(form.closingDay) < 31 && parseInt(form.closingDay) > 0 && parseInt(form.dueDay) < 31 && parseInt(form.dueDay) > 0 || form.closingDay == '' && form.dueDay == ''){
                try {
                    await paymentMethodsService.insertPaymentMethod({
                        alias: form.name,
                        last_digits: form.lastDigits,
                        closing_day: parseInt(form.closingDay),
                        due_day: parseInt(form.dueDay),
                        credit_limit: form.creditLimit,
                        personal_limit: form.personalLimit
                    });
                    setForm({
                        name: '',
                        lastDigits: '',
                        closingDay: '',
                        dueDay: '',
                        creditLimit: 0,
                        personalLimit: 0,
                    });
                    setDisplayCreditLimit('');
                    setDisplayPersonalLimit('');

                    Toast.show({
                        type: 'success',
                        text1: card ? 'Tarjeta creada correctamente' : 'Persona creada correctamente',
                        visibilityTime: 4000,
                    });

                } catch (error) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error creando la tarjeta',
                        text2: (error as Error).message.toString(),
                        visibilityTime: 7000,
                    });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Datos Incorrectos',
                    text2: 'Debes ingresar un dia válido para cierre y vencimiento',
                    visibilityTime: 7000,
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'No ingresaste datos',
                text2: 'Debes ingresar minimo nombre e identificador',
                visibilityTime: 7000,
            });
        }
    };

    const handleCreditLimitChange = (text: string) => {
        const cleaned = parseInt(text.replace(/\D/g, '')) || 0;
        updateForm('creditLimit', cleaned);          
        setDisplayCreditLimit(cleaned === 0 ? '' : formatCurrency(cleaned));
    };
    
    const handlePersonalLimitChange = (text: string) => {
        const cleaned = parseInt(text.replace(/\D/g, '')) || 0;
        updateForm('personalLimit', cleaned);           
        setDisplayPersonalLimit(cleaned === 0 ? '' : formatCurrency(cleaned));
    };

    
    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
            <View style={{overflow: 'hidden', flex: 1,paddingTop: 20, width: '100%' }}>
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
                <View style={{elevation: 15, backgroundColor: "rgba(0,0,0,0.2)", position: 'absolute', height: '80%', width: '3%', top: 60, right: 35, zIndex: -1, borderRadius: 10, alignSelf: 'center'}}/>
                <View style={{elevation: 15, backgroundColor: "rgba(0,0,0,0.2)", position: 'absolute', height: '80%', left: 35, width: '3%', top: 60, zIndex: -1, borderRadius: 10, alignSelf: 'center'}}/>
                <View style={{elevation: 15, backgroundColor: "rgba(0,0,0,0.2)", position: 'absolute', height: '3%', width: '82%', bottom: 40, zIndex: -1, borderRadius: 10, alignSelf: 'center'}}/>
                {/* Sombras */}

                {/* Fomrulario */}
                <ScrollView 
                contentContainerStyle={{ paddingBottom: 25 }}
                style={{
                    backgroundColor: '#BAD3A2', 
                    padding: 12, 
                    maxHeight: '90%', 
                    borderRadius: 10, 
                    alignSelf: 'center', 
                    width:  '85%', 
                }}>

                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{card ? 'Nombre de la tarjeta' : 'Nombre de la persona'}</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder={ card ? "Alias de la tarjeta" : "Nombre de quien pagara"}
                        value={form.name}
                        onChangeText={(text) => updateForm('name', text)}
                    />
                    {card 
                        ? <>
                            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Identificador de tarjeta</Text>
                            <TextInput 
                            keyboardType="numeric"
                            maxLength={4}
                            style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                            placeholderTextColor={'#999'}
                            placeholder="últimos 4 digitos"
                            value={form.lastDigits}
                            onChangeText={(text) => updateForm('lastDigits', text)}
                            />
                        </>
                        : <></>
                    }
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{'Cierre de la tarjeta'}</Text>
                    <TextInput 
                        keyboardType="numeric"
                        maxLength={2}
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder="Fecha de inicio de facturacion (aprox)"
                        value={form.closingDay}
                        onChangeText={(text) => updateForm('closingDay', text)}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Vencimiento de la tarjeta</Text>
                    <TextInput 
                        keyboardType="numeric"
                        maxLength={2}
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder="Fecha limite para pagar resumen (aprox)"
                        value={form.dueDay}
                        onChangeText={(text) => updateForm('dueDay', text)}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Limite de la tarjeta</Text>
                    <TextInput 
                        keyboardType="numeric"
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={'#999'}
                        placeholder="Limite crediticio de la tarjeta (aprox)"
                        value={displayCreditLimit}
                        onChangeText={handleCreditLimitChange}
                        
                    />
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Cuanto deseas gastar?</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput 
                            keyboardType="numeric"
                            style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                            placeholderTextColor={'#999'}
                            placeholder={method ? 'limite monetario' : 'limite en porcentaje'}
                            value={displayPersonalLimit}
                            onChangeText={handlePersonalLimitChange}
                            
                        />
                        {/* Update para mas adelante, limite en porcentaje */}
                        {/* <TouchableOpacity style={{ marginHorizontal: 8, padding: 10, top: 0, position: 'absolute', right: 0}} onPress={() => setMethod(!method)}>
                            {!method 
                            ? <Text>%</Text>
                            : <Text>$</Text>
                            }
                        </TouchableOpacity> */}
                    </View>
                </ScrollView>
                {/* Formulario */}

            </View>

            {/* Boton de cargar Emisor */}
            <ButtonStack text={'Añadir Emisor'} onPress={() => insertCard()} bt={20}/>
        </View>
        </KeyboardAvoidingView>
    )
}
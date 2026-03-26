import { View, Text, TextInput, ScrollView  } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { ButtonStack } from "../../../components/ButtonStack";
import { useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Selector } from "../../../components/Selector";
import Toast from "react-native-toast-message";
import { useInsertWithInstallments } from "../../../../hooks/useInsertWithInstallments";
import { formatCurrency } from "../../../../utils/currency";
import { colors } from "../../../styles/colors";

export function QuickExpenseScreen () {
    const [ paid, setPaid ] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [amount, setAmount] = useState<number>(0) 
    const [description, setDescription] = useState("")
    const [installments, setInstallments] = useState('')
    const [displayAmount, setDisplayAmount] = useState('');    
    
    // const [selectedId, setSelectedId] = useState<string | undefined>();
    const navigation = useNavigation();
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'NavMenu' }],
            })
        );
    };
    // const radioButtons: RadioButtonProps[] = useMemo(() => ([
    //     {
    //         id: '1', // acts as primary key, should be unique and non-empty string
    //         label: '25%',
    //         value: '25',
    //         containerStyle: { flexDirection: 'column', alignItems: 'center' },
    //         color: 'white'
    //     },
    //     {
    //         id: '2',
    //         label: '50%',
    //         value: '50',
    //         containerStyle: { flexDirection: 'column', alignItems: 'center' },
    //         color: 'white'
    //     },
    //     {
    //         id: '3', 
    //         label: '75%',
    //         value: '75',
    //         containerStyle: { flexDirection: 'column', alignItems: 'center' },
    //         color: 'white'
    //     },
    //     {
    //         id: '4',
    //         label: '100%',
    //         value: '100',
    //         containerStyle: { flexDirection: 'column' },
    //         color: 'white'
    //     }
    // ]), []);

    const { insert, loading } = useInsertWithInstallments();
    
    const createNewEgress = async () => {
            if (paymentMethod && amount > 0 && parseInt(installments) > 0 && description != '') {
            try {
                await insert({
                    payment_method_id: paymentMethod,
                    amount: amount,
                    description: description,
                    total_installments: parseInt(installments)
                });
                setPaymentMethod('Selecciona una tarjeta o persona');
                setAmount(0);
                setDescription('');
                setInstallments('');
                setDisplayAmount('');
                Toast.show({ type: 'success', text1: 'Egreso creado correctamente' });
            } catch (error) {
                Toast.show({ type: 'error', text1: 'Error al crear el egreso'}); 
            }
        } else Toast.show({ type: 'error', text1: 'Datos incompletos', text2: 'Todos los capos son obligatorios' });
    }

    const handleAmountChange = (text: string) => {

        const cleaned = text.replace(/\D/g, '');
        const number = parseInt(cleaned) || 0;
        
        setAmount(number);                          
        setDisplayAmount(formatCurrency(number));  
    };

    const restorePaymentMethod = (id: string) => {
        setPaymentMethod(id);
    }
    
    return (
        <View style={{ backgroundColor: '#F3F7EE', flex: 1, paddingTop: 0, alignContent: 'center'}}>
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
                <Text style={{ fontSize: 28, textAlignVertical: 'center'}}>Cargar egreso</Text>
            </View>
            {/* Formulario */}
            <View style={{flex: 1, paddingTop: 20, width: '100%'}}>
                <ScrollView 
                    // contentContainerStyle={{ paddingBottom: paid ? 25 : 0 }} comentado para update
                    style={{
                        backgroundColor: '#BAD3A2', 
                        padding: 12, 
                        maxHeight: paid ? '100%' : '70%', //  comentado para update : '80%'
                        borderRadius: 10, 
                        alignSelf: 'center',  
                        elevation: 15, 
                        width: '85%', 
                        paddingBottom: 100
                    }}
                >
                    <Selector 
                        title={"Selecciona un Emisor"} 
                        placeholder={"Selecciona una tarjeta o persona"}
                        idPaymentMethod={restorePaymentMethod}
                        fs={18}
                        cards
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Egreso</Text>
                    <TextInput 
                        keyboardType="numeric"
                        maxLength={10}
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={colors.placeholder}
                        placeholder="$"
                        value={displayAmount}
                        onChangeText={handleAmountChange}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Cantidad de cuotas</Text>
                    <TextInput 
                        keyboardType="numeric"
                        maxLength={3}
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={colors.placeholder}
                        placeholder="1, 3, 6, 9 ..."
                        value={installments}
                        onChangeText={(text) => setInstallments(text)}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Descripcion</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={colors.placeholder}
                        placeholder="Titulo de la compra"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        
                    />
                    {/* comentado para update futura, posibilidad de comprar con otra persona */}
                    {/* <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                            placeholderTextColor={colors.placeholder}
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
                    : <></>} */}
                </ScrollView>
            </View>
            {/* Boton de cargar egreso */}
            <View style={{backgroundColor: 'transparent'}}>
                <ButtonStack text={'Añadir egreso'} onPress={() => createNewEgress()} bt={20}/>
            </View>
        </View>
    )
}
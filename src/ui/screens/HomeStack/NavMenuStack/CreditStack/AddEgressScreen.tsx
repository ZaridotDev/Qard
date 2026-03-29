import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { BackButton } from "../../../../components/BackButton";
import { ButtonStack } from "../../../../components/ButtonStack";
import { useMemo, useState } from "react";
import { Scroll, Square, SquareCheckBig } from "lucide-react-native";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Selector } from "../../../../components/Selector";
import Toast from "react-native-toast-message";
import { useInsertWithInstallments } from "../../../../../hooks/useInsertWithInstallments";
import { formatCurrency } from "../../../../../utils/currency";
import { colors } from "../../../../styles/colors";
import { Separator } from "../../../../components/Separator";
import { ConfirmPreviewModal } from "../../../../components/Modals/ConfirmPreviewModal";
import { parse } from "@babel/core";
import { formatDateForUI } from "../../../../../utils/dateFormatUI";

export function AddEgressScreen () {
    const [form, setForm] = useState({
        paymentMethod: '',
        description: 'Parlante',
        installments: '12',
        nextInstallment: '1',
        totalAmount: 168000,
        installmentAmount: 14000,
    })
    const [paymentPlan, setPaymentPlan] = useState<any[]>([])
    const [ paid, setPaid ] = useState(false);
    const [displayTotalAmount, setDisplayTotalAmount] = useState('');    
    const [displayInstallmentAmount, setDisplayInstallmentAmount] = useState('');    
    const [alias, setAlias] = useState('');
    const [visible, setVisible] = useState(false);
    
    const navigation = useNavigation();
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'NavMenu' }],
            })
        );
    };

    const updateForm = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };


    const { insert, loading } = useInsertWithInstallments();
    
    const createNewEgress = async () => {
            if (form.paymentMethod && form.totalAmount > 0 && parseInt(form.installments) > 0 && form.description != '') {
            try {
                await insert({
                    payment_method_id: form.paymentMethod,
                    amount: form.totalAmount,
                    description: form.description,
                    total_installments: parseInt(form.installments)
                });
                setForm({
                    paymentMethod: '',
                    description: '',
                    installments: '',
                    nextInstallment: '',
                    totalAmount: 0,
                    installmentAmount: 0,
                })
                setDisplayTotalAmount('');
                setDisplayInstallmentAmount('');
                Toast.show({ type: 'success', text1: 'Egreso creado correctamente' });
            } catch (error) {
                Toast.show({ type: 'error', text1: 'Error al crear el egreso'}); 
            }
        } else Toast.show({ type: 'error', text1: 'Datos incompletos', text2: 'Todos los capos son obligatorios' });
    }

    const handleTotalAmountChange = (text: string) => {
        const cleaned = parseInt(text.replace(/\D/g, '')) || 0;
        updateForm('totalAmount', cleaned);                  
        setDisplayTotalAmount(cleaned === 0 ? '' : formatCurrency(cleaned));  
    };
    const handleInstallmentAmountChange = (text: string) => {
        const cleaned = parseInt(text.replace(/\D/g, '')) || 0;
        updateForm('installmentAmount', cleaned);                  
        setDisplayInstallmentAmount(cleaned === 0 ? '' : formatCurrency(cleaned));  
    };

    const restorePaymentMethod = (id: string, alias: string) => {
        updateForm('paymentMethod', id);
        setAlias(alias);
    }

    const calculateInstallments = () => {
        setVisible(true)
        const plan: any[] = [];
        const startMonth = parseInt(form.nextInstallment) || 1;
        
        for (let i = 0; i < parseInt(form.installments); i++){
            const dueDate = new Date();
            dueDate.setMonth(dueDate.getMonth() + (i - startMonth + 2))
            plan.push({
                number: i + 1,
                date: dueDate.toISOString().split('T')[0],
                isPaid: i + 1 < startMonth
            })
        }
        setPaymentPlan(plan);
        console.log(paymentPlan);
    }

    const prueba = () => {
        calculateInstallments();
    }
    
    return (
        <View style={{ backgroundColor: colors[1], flex: 1, paddingTop: 0, alignContent: 'center'}}>
            <BackButton onClick={goHome}/>
            {/* Titulo */}
            <View 
                style={{
                    backgroundColor: colors[4],
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
            <ConfirmPreviewModal 
                visible={visible} 
                onClose={() => setVisible(false)} 
                data={
                    <View 
                        style={{
                            justifyContent: 'center', 
                            // alignItems: 'flex-start',  
                            // backgroundColor: 'blue', 
                            // maxHeight: '90%', 
                            height: 'auto', 
                            padding: 10
                        }}
                    >
                        <Text style={{ color: colors[7], fontSize: 18, textAlign: 'left'}}>- Pagas con: {alias}</Text>
                        <Text style={{ color: colors[7], fontSize: 18, textAlign: 'left'}}>- Producto: {form.description}</Text>
                        <Text style={{ color: colors[7], fontSize: 18, textAlign: 'left'}}>- Valor total: {formatCurrency(form.totalAmount)}</Text>
                        <Text style={{ color: colors[7], fontSize: 18, textAlign: 'left'}}>- En {form.installments} cuotas de {formatCurrency(form.installmentAmount)} cada una.</Text>
                        <Text style={{ color: colors[7], fontSize: 18, textAlign: 'center'}}>Plan de cuotas:</Text>
                        <FlatList 
                            data={paymentPlan}
                            numColumns={2}
                            columnWrapperStyle={{justifyContent: 'space-between'}}
                            keyExtractor={(item) => item.number.toString()}

                            style={{
                                width: '100%', 
                                // padding: 15, 
                                // backgroundColor: 'yellow', 
                                // margin: 10, 
                                maxHeight: 100,
                                flexGrow: 0,
                                borderRadius: 10
                            }}

                            contentContainerStyle={{paddingBottom: 10, backgroundColor: colors[3]}}

                            renderItem={({item}) => 
                                <View key={item.number} style={{flexDirection: 'row', paddingLeft: 5, width: "50%", marginHorizontal: 4, marginVertical: 1}}>
                                    {item.isPaid && <Text style={{color: 'grey'}}>✓</Text>}
                                    <Text style={{color: item.isPaid ? 'grey' : colors[7]}}>
                                        {`${item.number}x: `}
                                    </Text>
                                    <Text style={{color: item.isPaid ? 'grey' : colors[7]}}>
                                        {`${new Date(item.date).toLocaleDateString('es-ES', {month: 'long'}).toUpperCase()} / ${new Date(item.date).toLocaleDateString('es-ES', {year: '2-digit'})}`}
                                    </Text>
                                </View>
                            }
                        />
                    </View>
                }
                confirm={() => prueba()}
            />
            {/* Formulario */}
            <View style={{flex: 1, paddingTop: 20, width: '100%'}}>
                <ScrollView 
                    // contentContainerStyle={{ paddingBottom: paid ? 25 : 0 }} comentado para update
                    style={{
                        backgroundColor: colors[4], 
                        padding: 12, 
                        maxHeight: paid ? '95%' : '88%',
                        borderRadius: 10, 
                        alignSelf: 'center',  
                        elevation: 5, 
                        width: '85%', 
                    }}
                >

                    {/* DATA */}
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Descripcion del producto</Text>
                    <TextInput 
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={colors.placeholder}
                        placeholder="Titulo de la compra"
                        value={form.description}
                        onChangeText={(text) => updateForm('description', text)}
                        
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Valor total del producto</Text>
                    <TextInput 
                        keyboardType="numeric"
                        maxLength={10}
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={colors.placeholder}
                        placeholder="$"
                        value={displayTotalAmount}
                        onChangeText={handleTotalAmountChange}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Cantidad total de cuotas</Text>
                    <TextInput 
                        keyboardType="numeric"
                        maxLength={3}
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={colors.placeholder}
                        placeholder="1, 3, 6, 9 ..."
                        value={form.installments}
                        onChangeText={(text) => updateForm('installments',text)}
                    />
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Valor de cuota</Text>
                    <TextInput 
                        keyboardType="numeric"
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 4, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={colors.placeholder}
                        placeholder="$"
                        value={displayInstallmentAmount}
                        onChangeText={handleInstallmentAmountChange}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center'}}>tenes cuotas pagadas?</Text>
                        <TouchableOpacity style={{ marginHorizontal: 8,padding: 10, top: 2}} onPress={() => setPaid(!paid)}>
                            {!paid 
                            ? <Square size={24} color={'white'} />
                            : <SquareCheckBig size={24} color={'white'} />
                            }
                        </TouchableOpacity>
                    </View>
                    { paid
                    ? <>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>n° de cuota del proximo resumen</Text>
                        <TextInput 
                        keyboardType="numeric"
                        maxLength={3}
                        style={{width: '100%', backgroundColor: 'white', height: 40, fontSize: 16, marginBottom: 12, borderRadius: 10, paddingLeft: 10}}
                        placeholderTextColor={colors.placeholder}
                        placeholder="1, 3, 6, 9 ..."
                        value={form.nextInstallment}
                        onChangeText={(text) => updateForm('nextInstallment',text)}
                        />
                    </>
                    : <></>
                    }
                    <Selector 
                        title={"Seleccionar tarjeta "} 
                        placeholder={"Selecciona una tarjeta o persona"}
                        idPaymentMethod={restorePaymentMethod}
                        fs={18}
                        cards
                    />
                    <Separator hg={20} wd={10}/>

                    {/* comentado para update futura, posibilidad de comprar con otra persona */}
                    {/* { paid 
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

                    {/* DATA */}
                </ScrollView>
            </View>
            {/* Boton de cargar egreso */}
            <View style={{backgroundColor: 'transparent'}}>
                <ButtonStack text={'Añadir egreso'} onPress={calculateInstallments} bt={20}/>
            </View>
        </View>
    )
}
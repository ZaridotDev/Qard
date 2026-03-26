import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Trash, SquarePen, Square, SquareCheckBig } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { useMonthlyInstallments } from '../../../../../hooks/useMonthlyInstallments';
import { formatCurrency } from '../../../../../utils/currency';
import { transactionService } from '../../../../../services/src/services/transactions.service';
import { installmentsService } from '../../../../../services/src/services/installments.service';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

type CreditExpensesScreenType = {
  crud: (crud: boolean) => void;
  title: string;
  id: string;
  selectMonth: string[];
}

export function CreditExpensesScreen({ crud, title, id, selectMonth}: CreditExpensesScreenType) {
  const [localRefresh, setLocalRefresh] = useState(0);
  const { installments, loading } = useMonthlyInstallments(id, selectMonth[0], selectMonth[1], localRefresh);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [ totalAmount, setTotalAmount ] = useState(0)

  const hasSelected = installments.some(i => selected[i.id] && !i.is_paid);

  const toggleItem = (itemId: string) => {
    const installment = installments.find(i => i.id === itemId);
    if (installment?.is_paid) return; 
    setSelected(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const allSelected = installments.length > 0 && installments.every(i => selected[i.id]);

  const handlePaySingle = async (installment: any, skipRefresh = false) => {
    if (installment.is_paid) return;
    toggleItem(installment.id); 
    const today = new Date().toISOString().split('T')[0];
    try {
        const { data: transaction, error } = await transactionService.insert({
            type: 'expense',
            amount: parseFloat(installment.amount),
            description: `${installment.description} ${installment.installment_number}/${installment.total_installments}`,
            transaction_date: today,
            payment_method_id: id,
        });
        if (error) throw error;
        await installmentsService.markAsPaid(installment.id, transaction.id);
        if (!skipRefresh) { // ← solo refresca si no viene del loop
          Toast.show({ type: 'success', text1: 'Cuota pagada correctamente' });
          setLocalRefresh(t => t + 1);
        }
    } catch (error) {
        Toast.show({ type: 'error', text1: 'Error al registrar el pago' });
    }
};

  const handlePayAll = async () => {
    const today = new Date().toISOString().split('T')[0];
    if (installments.length === 0 || installments.every(i => i.is_paid)) {
      Toast.show({ type: 'info', text1: 'No hay cuotas que pagar en esta tarjeta' });
      return;
    }
    try {
      if (hasSelected) {
        const selectedInstallments = installments.filter(i => selected[i.id] && !i.is_paid);
        const total = selectedInstallments.reduce((acc, i) => acc + parseFloat(i.amount), 0);
        const { data: transaction, error } = await transactionService.insert({
            type: 'expense',
            amount: total,
            description: `Pagos seleccionados ${title}`,
            transaction_date: today,
            payment_method_id: id,
        });
        if (error) throw error;
        await installmentsService.markManyAsPaid(selectedInstallments.map(i => i.id), transaction.id);
        Toast.show({ type: 'success', text1: 'Pagos seleccionados registrados' });
        setSelected({});
        setLocalRefresh(t => t + 1);
    } else {
      const unpaid = installments.filter(i => !i.is_paid);
      const hasSomePaid = installments.some(i => i.is_paid); // ← detecta si hay alguno pagado
      const total = unpaid.reduce((acc, i) => acc + parseFloat(i.amount), 0);
      const { data: transaction, error } = await transactionService.insert({
          type: 'expense',
          amount: total,
          description: hasSomePaid ? `Pagos restantes ${title}` : `Pago completo ${title}`, // ← cambia según el caso
          transaction_date: today,
          payment_method_id: id,
      });
      if (error) throw error;
      await installmentsService.markManyAsPaid(unpaid.map(i => i.id), transaction.id);
      Toast.show({ type: 'success', text1: hasSomePaid ? 'Pagos restantes registrados' : 'Pago completo registrado' });
      setLocalRefresh(t => t + 1);
    }
    } catch (error) {
        Toast.show({ type: 'error', text1: 'Error al registrar el pago' });
    }
  };

  const handleDelete = async (item: any) => {
    // Traer TODAS las cuotas de esa compra sin filtro de fecha
    const { data: allInstallments, error } = await installmentsService.getByDescriptionAndPaymentMethod(
        item.description, 
        item.payment_method_id
    );

    if (error || !allInstallments) return;

    const hasPaid = allInstallments.some(i => i.is_paid);

    if (hasPaid) {
        Toast.show({ 
            type: 'error', 
            text1: 'No podés eliminar esta compra',
            text2: 'Tenes cuotas ya pagadas.',
            visibilityTime: 5000
        });
        return;
    }

    const ids = allInstallments.map(i => i.id);
    const { error: deleteError } = await installmentsService.deleteMany(ids);
    Toast.show({ type: 'success', text1: 'Compra eliminada correctamente' });
    setLocalRefresh(t => t + 1);
  };

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < installments.length; i++) {
      if (!installments[i].is_paid) {
        total += parseFloat(installments[i].amount);
      }
    }
    setTotalAmount(total)

    const initialSelected: Record<string, boolean> = {};
    installments.forEach(i => {
        if (i.is_paid) initialSelected[i.id] = true;
    });
    setSelected(initialSelected);

  }, [installments]);

  useFocusEffect(
    useCallback(() => {
        setLocalRefresh(t => t + 1);
    }, [])
  );
  
  return (
    // Container General
    <View style={{
      backgroundColor: 'trasnsparent',
      borderRadius: 16,
      marginBottom: 32,
      flex: 1
      }}>
    {/* Container General */}

      {/* Titulos */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{ backgroundColor: '#D9E7CB', borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 4, width: 100}}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>{title}</Text>
        </View>
        <View style={{ backgroundColor: '#D9E7CB', borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 4, width: 150, alignSelf: 'flex-end'}}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>{formatCurrency(totalAmount)}</Text>
        </View>
      </View>
      {/* Titulos */}

      {/* Sombras */}
      <View style={{elevation: 7, backgroundColor: "rgba(0,0,0,0.2)", position: 'absolute', height: 40, width:100, zIndex: -1, borderTopStartRadius: 10, borderTopEndRadius: 10}}/>
      <View style={{elevation: 7, backgroundColor: "rgba(0,0,0,0.2)", position: 'absolute', height: 40, width:150, zIndex: -1, borderTopStartRadius: 10, borderTopEndRadius: 10, right: 0}}/>
      <View style={{elevation: 7, backgroundColor: "rgba(0,0,0,0.2)", position: 'absolute', top: 40, bottom: 35, right: 0, left: 0, zIndex: -1, borderBottomStartRadius: 10, }}/>
      <View style={{elevation: 7, backgroundColor: "rgba(0,0,0,0.2)", position: 'absolute', height: 35, width: 110, zIndex: -1, borderBottomStartRadius: 10, borderBottomEndRadius: 10 , bottom: 0, right: 0}}/>
      {/* Sombras */}

      {/* Card de egresos */}
      <View style={{ backgroundColor: '#D9E7CB', minHeight: 100, borderBottomStartRadius: 10, padding: 4}}>

        {/* <View style={{ backgroundColor: 'rgba(0,0,0,0.1)',  height: '97%', position: 'absolute', top: 5, right: 55, width: 2, zIndex: 1}}/> */}
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)',  height: '97%', position: 'absolute', top: 5, right: 55, width: 2, zIndex: 1}}/>
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)',  height: '97%', position: 'absolute', top: 5, right: 150, width: 2, zIndex: 1}}/>

          {/* INSTALLMENTS */}
          <FlatList
          data={installments}
          // contentContainerStyle={{ paddingBottom: 60 }}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
                style={{ 
                  marginBottom: 5, 
                  flexDirection: 'row', 
                  borderRadius: 8,
                  height: 35,
                  alignItems: 'center',
                  backgroundColor: '#BAD3A2', 
                }}
              >
              <View style={{ flex: 3, marginLeft: 12, flexDirection: 'row', }}>
                <Text style={{ fontSize: 14 }}>{item.description}</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginHorizontal: 4, top: 3}}>{`${item.installment_number}/${item.total_installments}`}</Text>
              </View>
              <Text style={{ fontSize: 12, flex: 2, textAlign: 'right', marginHorizontal: 4 }}>{formatCurrency(item.amount)}</Text>

              <TouchableOpacity style={{ marginLeft: 4, }} onPress={() => handleDelete(item)}>
                <Trash size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 8, }} onPress={() => handlePaySingle(item)}>
                {!selected[item.id] 
                ? <Square size={16} />
                : <SquareCheckBig size={16} />
                }
              </TouchableOpacity>
            </View>
          )}
          /> 
      </View>
      {/* Card de egresos */}


      <View style={{ backgroundColor: '#D9E7CB', width: 110, borderBottomStartRadius: 10, borderBottomEndRadius: 10, padding: 8, alignSelf: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
        <Text style={{ fontSize: 12, textAlign: 'right', marginHorizontal: 4 }}>Pagar total: </Text>    
        <TouchableOpacity onPress={handlePayAll}>
          {!allSelected 
          ? <Square size={18} />
          : <SquareCheckBig size={18} />
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}
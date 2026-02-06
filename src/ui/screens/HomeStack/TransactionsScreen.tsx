import { View, Text, FlatList, Button } from 'react-native';
import { useMonthlyTransactions } from '../../../hooks/useMonthlyTransactions';
import { formatDateForUI } from '../../../utils/dateFormatUI';
import { getMonthRange, parseLocalDate } from '../../../utils/date';
import { useEffect, useState } from 'react';

export function TransactionsScreen() {
  const { startCurrentMonth, endCurrentMonth } = getMonthRange(new Date());
  const [selectMonth, setSelectMonth] = useState([startCurrentMonth, endCurrentMonth]);
  const [ balance, setBalance ] = useState<number>(0);

  const { transactions, loading, error } = useMonthlyTransactions(selectMonth[0], selectMonth[1]);

  if (error) return <Text>Error: {error}</Text>;

  // console.log(balance);
  
  useEffect(() => {
    // console.log(selectMonth[0])
    let income = 0;
    let expense = 0;
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === 'income') {
        income += parseFloat(transactions[i].amount);
      } else {
        expense += parseFloat(transactions[i].amount);
      }
      // total += parseFloat(transactions[i].amount);\
      total = income - expense;
    }
    // console.log(total)
    setBalance(total);
  },[transactions])

  // Usar parseLocalDate para que "YYYY-MM-DD" sea siempre en hora local (igual en emulador y dispositivo)
  const dateSelected = parseLocalDate(selectMonth[0]);

  const getCurrentMonth = () => {
    return dateSelected.toLocaleDateString('es-ES', { month: 'long' }).toUpperCase();
  };

  const goToPreviousMonth = () => {
    const prev = new Date(dateSelected.getFullYear(), dateSelected.getMonth() - 1, 1);
    const { startCurrentMonth: inicio, endCurrentMonth: fin } = getMonthRange(prev);
    setSelectMonth([inicio, fin]);
  };

  const goToNextMonth = () => {
    const next = new Date(dateSelected.getFullYear(), dateSelected.getMonth() + 1, 1);
    const { startCurrentMonth: inicio, endCurrentMonth: fin } = getMonthRange(next);
    setSelectMonth([inicio, fin]);
  };
  
  return (
    <>
    {/* SELECCION DE MES */}
      <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button 
          title={'<'}
          onPress={goToPreviousMonth}
        />
        <View>
          <Text>{getCurrentMonth()}</Text>
        </View>
        <Button 
          title={'>'}
          onPress={goToNextMonth}
        />
      </View>
      <View style={{ backgroundColor: '#BAD3A2', height: '80%', borderRadius: 10, padding: 10}}>

          {/* TITULOS */}
          <View
          style={{ marginBottom: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold'  }}>Descripcion</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold'  }}>Monto</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold'  }}>Metodo</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Fecha</Text>
          </View>

          {/* TRANSACTIONS */}
          <FlatList
          data={transactions}
          style={{ marginTop: 0, display: 'flex' }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
              <Text style={{ fontSize: 14 }}>{item.description}</Text>
              <Text style={{ fontSize: 14 }}>{item.amount}</Text>
              <Text style={{ fontSize: 14 }}>{item.type}</Text>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{formatDateForUI(item.transaction_date)}</Text>
            </View>
          )}
          /> 

          {/* TOTAL BALANCE */}
          <View style={{ height: 55, width: '45%', alignSelf: 'flex-end', justifyContent: 'space-between', backgroundColor: 'red', borderRadius: 10, padding: 4}}>
            <Text style={{ fontSize: 14, alignSelf: 'center' }}>Total disponible:</Text>
            <Text style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>${balance}</Text>
          </View>
      </View>
    </>
  );
}

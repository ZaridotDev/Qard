import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { useMonthlyTransactions } from '../../../hooks/useMonthlyTransactions';
import { formatDateForUI } from '../../../utils/dateFormatUI';
import { getMonthRange, parseLocalDate } from '../../../utils/date';
import { Trash, SquarePen, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { transactionService } from '../../../services/src/services/transactions.service';

type TransactionsScreenType = {
  refreshTrigger?: number;
  crud: (crud: boolean) => void;
}

export function TransactionsScreen({ refreshTrigger = 0, crud }: TransactionsScreenType) {
  const { startCurrentMonth, endCurrentMonth } = getMonthRange(new Date());
  const [selectMonth, setSelectMonth] = useState([startCurrentMonth, endCurrentMonth]);
  const [ balance, setBalance ] = useState<number>(0);

  const { transactions, loading, error } = useMonthlyTransactions(
    selectMonth[0],
    selectMonth[1],
    refreshTrigger
  );
  
  if (error) return <Text>Error: {error}</Text>;

  useEffect(() => {
    let income = 0;
    let expense = 0;
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === 'income') {
        income += parseFloat(transactions[i].amount);
      } else {
        expense += parseFloat(transactions[i].amount);
      }
      total = income - expense;
    }
    setBalance(total);
  }, [transactions]);

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

  const getTransactionType = (string: string) => {
    return string === 'income' ;
  
  };

  const deleteItem = async (id: string) => {
    const {error} = await transactionService.delete(id)
    if (error) console.error(error)
    crud(true);
  }
  
  return (
    <>
    {/* SELECCION DE MES */}
      <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', width: '90%'}}>
        <TouchableOpacity 
          onPress={goToPreviousMonth}
          style={{flex: 1, alignItems: 'center'}}
        >
          <ChevronLeft />
        </TouchableOpacity> 
        <View style={{backgroundColor: '#BAD3A2', padding: 10, flex: 3, borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', elevation: 15}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center'}}>{getCurrentMonth()}</Text>
        </View>
        <TouchableOpacity 
          onPress={goToNextMonth}
          style={{flex: 1, alignItems: 'center'}}
        >
          <ChevronRight />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#D9E7CB', height: '80%', borderRadius: 10, padding: 4, flex: 1, elevation: 5, marginBottom: 10}}>

        {/* <View style={{ backgroundColor: 'rgba(0,0,0,0.1)',  height: '97%', position: 'absolute', top: 5, right: 55, width: 2, zIndex: 1}}/> */}
        <View style={{ backgroundColor: 'rgba(0,0,0,0.1)',  height: '97%', position: 'absolute', top: 5, right: 93, width: 2, zIndex: 1}}/>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.1)',  height: '97%', position: 'absolute', top: 5, right: 200, width: 2, zIndex: 1}}/>

          {/* TRANSACTIONS */}
          <FlatList
          data={transactions}
          contentContainerStyle={{ paddingBottom: 60 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
                style={{ 
                  marginBottom: 5, 
                  flexDirection: 'row', 
                  borderRadius: 8,
                  height: 35,
                  alignItems: 'center',
                  backgroundColor: getTransactionType(item.type) ? '#BAD3A2' : '#E7B8B8', 
                }}
              >
              <Text style={{ fontSize: 14, flex: 3, marginLeft: 12 }}>{item.description}</Text>
              <Text style={{ fontSize: 14, flex: 2, textAlign: 'right', marginHorizontal: 4 }}>{item.amount}</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold', flex: 0.7, textAlign: 'right', marginHorizontal: 4, width: 10 }}>{formatDateForUI(item.transaction_date)}</Text>
              <TouchableOpacity style={{ marginLeft: 4, }}>
                <SquarePen size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 8, }} onPress={() => deleteItem(item.id)}>
                <Trash size={16} />
              </TouchableOpacity>
            </View>
          )}
          /> 

          {/* TOTAL BALANCE */}
          <View style={{ height: 55, width: '45%', alignSelf: 'flex-end', justifyContent: 'space-between', backgroundColor: '#93B771', borderRadius: 10, padding: 4, position: 'absolute', bottom: 8, right: 8, zIndex: 2, elevation: 3}}>
            <Text style={{ fontSize: 16, alignSelf: 'center' }}>Total disponible:</Text>
            <Text style={{ fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}>${balance}</Text>
          </View>
      </View>
    </>
  );
}
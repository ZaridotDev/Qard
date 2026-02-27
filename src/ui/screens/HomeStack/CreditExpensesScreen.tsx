import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useMonthlyTransactions } from '../../../hooks/useMonthlyTransactions';
import { formatDateForUI } from '../../../utils/dateFormatUI';
import { getMonthRange } from '../../../utils/date';
import { Trash, SquarePen, Square, SquareCheckBig } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { transactionService } from '../../../services/src/services/transactions.service';

type CreditExpensesScreenType = {
  refreshTrigger?: number;
  crud: (crud: boolean) => void;
}

export function CreditExpensesScreen({ refreshTrigger = 0, crud }: CreditExpensesScreenType) {
  const { startCurrentMonth, endCurrentMonth } = getMonthRange(new Date());
  const [selectMonth, setSelectMonth] = useState<string[]>([startCurrentMonth, endCurrentMonth]);
  const [ balance, setBalance ] = useState<number>(0);
  const [ paid, setPaid ] = useState(false);


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

  const restoreSelecetMonth = (selected: string[]) => {
    setSelectMonth(selected);
  }

  const getTransactionType = (string: string) => {
    return string === 'income' ;
  
  };

  const deleteItem = async (id: string) => {
    const {error} = await transactionService.delete(id)
    if (error) console.error(error)
    crud(true);
  }
  
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
          <Text style={{fontSize: 24, textAlign: 'center'}}>AMEX</Text>
        </View>
        <View style={{ backgroundColor: '#D9E7CB', borderTopStartRadius: 10, borderTopEndRadius: 10, padding: 4, width: 150, alignSelf: 'flex-end'}}>
          <Text style={{fontSize: 24, textAlign: 'center'}}>$0.000.000</Text>
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
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)',  height: '97%', position: 'absolute', top: 5, right: 93, width: 2, zIndex: 1}}/>
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)',  height: '97%', position: 'absolute', top: 5, right: 200, width: 2, zIndex: 1}}/>

          {/* TRANSACTIONS */}
          <FlatList
          data={transactions}
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
                  backgroundColor: getTransactionType(item.type) ? '#BAD3A2' : '#E7B8B8', 
                }}
              >
              <View style={{ flex: 3, marginLeft: 12, flexDirection: 'row', }}>
                <Text style={{ fontSize: 14 }}>{item.description}</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginHorizontal: 4}}>{/* Cuotas */} 1/6</Text>
              </View>
              <Text style={{ fontSize: 14, flex: 2, textAlign: 'right', marginHorizontal: 4 }}>{item.amount}</Text>

              <TouchableOpacity style={{ marginLeft: 4, }}>
                <SquarePen size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 4, }} onPress={() => deleteItem(item.id)}>
                <Trash size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 8, }} onPress={() => setPaid(true)}>
                {!paid 
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
        <TouchableOpacity  onPress={() => setPaid(true)}>
          {!paid 
          ? <Square size={18} />
          : <SquareCheckBig size={18} />
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}
import { View, Text, TouchableOpacity } from 'react-native';
import { getMonthRange, parseLocalDate } from '../../../utils/date';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';

type SelectMonthScreenType = {
    selected: (selectMonthIndex: string[]) => void;
}


export function SelectMonthScreen ({selected}: SelectMonthScreenType) {
    const { startCurrentMonth, endCurrentMonth } = getMonthRange(new Date());
    const [selectMonth, setSelectMonth] = useState([startCurrentMonth, endCurrentMonth]);


    const dateSelected = parseLocalDate(selectMonth[0]);

    const getCurrentMonth = () => {
        return dateSelected.toLocaleDateString('es-ES', { month: 'long' }).toUpperCase();
    };
    
    const goToPreviousMonth = () => {
        const prev = new Date(dateSelected.getFullYear(), dateSelected.getMonth() - 1, 1);
        const { startCurrentMonth: inicio, endCurrentMonth: fin } = getMonthRange(prev);
        const newRange = [inicio, fin];
        setSelectMonth(newRange);
        selected(newRange);
    };
    
    const goToNextMonth = () => {
        const next = new Date(dateSelected.getFullYear(), dateSelected.getMonth() + 1, 1);
        const { startCurrentMonth: inicio, endCurrentMonth: fin } = getMonthRange(next);
        const newRange = [inicio, fin];
        setSelectMonth(newRange);
        selected(newRange);
    };
    
    return (
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
    )
}
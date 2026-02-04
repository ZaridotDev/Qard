import { View, Button } from 'react-native';
import { transactionService } from '../../services/src/services/transactions.service';

export function CreateTransactionScreen() {
  const createTransaction = async () => {
    try {
      const transaction = await transactionService.insert({
        type: 'expense',
        amount: 1000,
        description: 'Supermercado',
        transaction_date: '2026-03-29',
      });

      console.log('Transaction creada', transaction);
    } catch (error) {
      console.error('Error creando transaction', error);
    }
  };

  return (
    <View>
      <Button title="Crear gasto" onPress={createTransaction} />
    </View>
  );
}

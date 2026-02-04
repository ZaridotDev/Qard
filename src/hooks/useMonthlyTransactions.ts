import { useEffect, useState } from 'react';
import { transactionService } from '../services/src/services/transactions.service';
import { getMonthRange } from '../utils/date';

export function useMonthlyTransactions(start: string, end: string) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const { start, end } = getMonthRange();

    setLoading(true);
    setError(null);
    transactionService.getByMonth(start, end).then(({ data, error }) => {
      if (error) {
        setError(error.message);
      } else {
        setTransactions(data ?? []);
      }
      setLoading(false);
    });
  }, [start, end]);

  return { transactions, loading, error };
}

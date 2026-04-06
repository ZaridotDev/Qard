import { useEffect, useState } from 'react';
import { transactionService } from '../services/src/services/transactions.service';

export function useMonthlyTransactions(
  start: string,
  end: string,
  refreshTrigger: number
) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, [start, end, refreshTrigger]);

  return { transactions, loading, error };
}
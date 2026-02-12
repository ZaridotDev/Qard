import { useEffect, useState } from 'react';
import { transactionService } from '../services/src/services/transactions.service';
import { getMonthRange } from '../utils/date';

/**
 * refreshTrigger: cuando cambia (ej. al cerrar un modal que guardó datos),
 * el hook vuelve a hacer fetch. Incrementar desde el padre cuando algo externo
 * modifique los datos (crear/editar/borrar transacción).
 */
export function useMonthlyTransactions(
  start: string,
  end: string,
  refreshTrigger: number = 0
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
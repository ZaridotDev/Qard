import { useEffect, useState } from 'react';
import { recurrentEgressService } from '../services/src/services/recurrentEgress.service';

export function useRecurringTransactions(
  refreshTrigger: number = 0
) {
  const [reccurents, setReccurents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    recurrentEgressService.getrRecurringTransactions().then(({ data, error }) => {
      if (error) {
        setError(error.message);
      } else {
        setReccurents(data ?? []);
      }
      setLoading(false);
    });
  }, [refreshTrigger]);

  return { reccurents, loading, error };
}
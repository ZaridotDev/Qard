import { useEffect, useState } from 'react';
import { installmentsService } from '../services/src/services/installments.service';

export function useMonthlyInstallments(
  id: string,
  start: string,
  end: string,
  refreshTrigger: number = 0
) {
  const [installments, setInstallments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    installmentsService.getInstallments(id, start, end)
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
        } else {
          setInstallments(data ?? []);
        }
        setLoading(false);
      });
  }, [id, start, end, refreshTrigger]);

  return { installments, loading, error };
}
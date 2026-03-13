import { useEffect, useState } from 'react';
import { budgetingService } from '../services/src/services/budgeting.service';

export function useUpdateBudget(
  id: string,
  newAmount: number,
) {
  const [message, setmessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    budgetingService.updateBudget(id, newAmount).then(({ data, error }) => {
      console.log('data:', JSON.stringify(data));
      if (error) {
        setError(error.message);
      } else {
        setmessage('Actualizado con exito');
      }
      setLoading(false);
    });
  }, []);

  return { message, loading, error };
}
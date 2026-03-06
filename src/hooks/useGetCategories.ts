import { useEffect, useState } from 'react';
import { budgetingService } from '../services/src/services/budgeting.service';

/**
 * refreshTrigger: cuando cambia (ej. al cerrar un modal que guardó datos),
 * el hook vuelve a hacer fetch. Incrementar desde el padre cuando algo externo
 * modifique los datos (crear/editar/borrar transacción).
 */
export function useGetCategories(
  refreshTrigger: number = 0
) {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    budgetingService.getCatergory().then(({ data, error }) => {
      console.log('data:', JSON.stringify(data, null, 2));
      if (error) {
        setError(error.message);
      } else {
        setCategories(data ?? []);
      }
      setLoading(false);
    });
  }, [refreshTrigger]);

  return { categories, loading, error };
}
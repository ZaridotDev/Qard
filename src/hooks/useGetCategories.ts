import { useEffect, useState } from 'react';
import { budgetingService } from '../services/src/services/budgeting.service';

export function useGetCategories(
  refreshTrigger: number = 0
) {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    budgetingService.getCatergories().then(({ data, error }) => {
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
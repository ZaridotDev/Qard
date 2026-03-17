import { useEffect, useState } from 'react';
import { shoppingItemsService } from '../services/src/services/shoppintItems.service';

export function useGetHistory() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    shoppingItemsService.getBudgetTransaction().then(({ data, error }) => {
      console.log('data:', JSON.stringify(data, null, 2));
      if (error) {
        setError(error.message);
      } else {
        setCategories(data ?? []);
      }
      setLoading(false);
    });
  }, []);

  return { categories, loading, error };
}
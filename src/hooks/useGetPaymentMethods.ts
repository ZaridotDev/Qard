import { useEffect, useState } from 'react';
import { paymentMethodsService } from '../services/src/services/paymentMethods.service';

export function useGetPaymentMethods(
  refreshTrigger: number = 0
) {
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    paymentMethodsService.getPaymentMethods().then(({ data, error }) => {
      console.log('data:', JSON.stringify(data, null, 2));
      if (error) {
        setError(error.message);
      } else {
        setPaymentMethods(data ?? []);
      }
      setLoading(false);
    });
  }, [refreshTrigger]);

  return { paymentMethods, loading, error };
}
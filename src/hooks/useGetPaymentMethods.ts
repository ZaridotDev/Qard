import { useEffect, useState } from 'react';
import { paymentMethodsService } from '../services/src/services/paymentMethods.service';

export function useGetPaymentMethods(
  refreshTrigger: number
) {
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [MethodsWithInstallments, setMethodsWithInstallments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    paymentMethodsService.getPaymentMethods().then(({ data, error }) => {
      if (error) {
        setError(error.message);
      } else {
        setPaymentMethods(data ?? []);
      }
      setLoading(false);
    });
    paymentMethodsService.getPaymentMethodsWithInstallments().then(({ data, error }) => {
      if (error) {
        setError(error.message);
      } else {
        setMethodsWithInstallments(data ?? []);
      }
      setLoading(false);
    });
  }, [refreshTrigger]);

  return { paymentMethods, MethodsWithInstallments, loading, error };
}
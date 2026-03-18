import { supabase } from '../../../core/supabase/client';

export type paymentMethodsType = {
  alias: string,
  last_digits: string,
  closing_day: number,
  due_day: number,
  credit_limit: number,
  personal_limit: number,
};

export const  paymentMethodsService = {
  async getPaymentMethods() {
    return supabase
      .from('payment_methods')
      .select(`*`)
      .order('created_at', { ascending: false })
  },
  async insertPaymentMethod(data: paymentMethodsType) {
    return supabase.from('payment_methods').insert(data).select();
  },
};  

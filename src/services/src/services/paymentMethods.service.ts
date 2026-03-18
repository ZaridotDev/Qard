import { supabase } from '../../../core/supabase/client';

export type paymentMethodsType = {
  alias: string,
  lastDigits: string,
  closingDay: number,
  dueDay: number,
  creditLimit: number,
  personalLimit: number,
};

export const  paymentMethodsService = {
  // async getrRecurringTransactions() {
  //   return supabase
  //     .from('recurring_transactions')
  //     .select(`
  //       id,
  //       amount,
  //       description,
  //       category_id
  //     `)
  //     .order('created_at', { ascending: false })
  // },
  async insertPaymentMethod(data: paymentMethodsType) {
    return supabase.from('payment_methods').insert(data).select();
  },
};  

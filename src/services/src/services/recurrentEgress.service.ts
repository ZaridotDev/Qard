import { supabase } from '../../../core/supabase/client';

export type recurrentEgressType = {
    type: string;
    amount: number;
    description: string;
    category_id?: string;
    start_date: Date;
};

export const recurrentEgressService = {
  async getrRecurringTransactions() {
    return supabase
      .from('recurring_transactions')
      .select(`
        id,
        amount,
        description,
        category_id
      `)
      .order('created_at', { ascending: false })
  },
  async insertRecurringTransaction(data: recurrentEgressType) {
    return supabase.from('recurring_transactions').insert(data).select();
  },
};  

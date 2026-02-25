import { supabase } from '../../../core/supabase/client';

export type TransactionInsert = {
  type: 'expense' | 'income';
  amount: number;
  description?: string;
  transaction_date?: string;
};
export const transactionService = {
  async getByMonth(start: string, end: string) {
    return supabase
    .from('transactions')
    .select('*')
    .gte('transaction_date', start)
    .lte('transaction_date', end)
    .order('created_at', { ascending: false })
    .order('transaction_date', { ascending: false });
    
  },
  async insert(data: TransactionInsert) {
    return supabase.from('transactions').insert(data);
  },    
  async delete(id: string) {
    return supabase.from('transactions').delete().eq('id', id);
  },
};

import { supabase } from '../../../core/supabase/client';

export type CategoryInsert = {
    name: string;
};
export type BudgetInsert = {
    category_id: string;
    amount: number;
};

export const budgetingService = {
  async getCatergory() {
    return supabase
      .from('categories')
      .select(`
        *,
        budgets (
          id,
          amount
        )
      `)
      .order('created_at', { ascending: false })
  },
  async getBudget() {
    return supabase
    .from('budgets')
    .select('*')
    .order('created_at', { ascending: false })
  },
  async insertCategory(data: CategoryInsert) {
    return supabase.from('categories').insert(data).select().single();
  },
  async insertBudget(data: BudgetInsert) {
    return supabase.from('budgets').insert(data);
  },  
  async deleteCategory(id: string) {
    return supabase.from('categories').delete().eq('id', id);
  },
  async deleteBudget(id: string) {
    return supabase.from('budgets').delete().eq('id', id);
  },
};

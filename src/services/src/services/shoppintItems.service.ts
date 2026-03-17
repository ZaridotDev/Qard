import { supabase } from '../../../core/supabase/client';

export type ShoppingItemInsert = {
    transaction_id: string;
    category_id: string;
    description: string;
    price: number;
    quantity: number;
};

export const shoppingItemsService = {
  async getBudgetTransaction() {
    return supabase
      .from('categories')
      .select(`
        name,
        transactions!inner (
          id,
          amount,
          description,
          transaction_date,
          shopping_items (
            id,
            description,
            price,
            quantity
          )
        )
      `)
      .order('created_at', { ascending: false })
  },
  async insertItems(data: ShoppingItemInsert) {
    return supabase.from('shopping_items').insert(data).select();
  },
};

import { supabase } from "../../../core/supabase/client";

export type InstallmentPurchaseInsert = {
    payment_method_id: string;
    amount: number;
    description: string;
    total_installments: number;
};

export const installmentsService = {
    async insertWithInstallments(data: InstallmentPurchaseInsert) {
        const installment_amount = data.amount / data.total_installments;

        const installments = Array.from({ length: data.total_installments }, (_, i) => {
            const dueDate = new Date();
            dueDate.setMonth(dueDate.getMonth() + i + 1);
            return {
                payment_method_id: data.payment_method_id,
                installment_number: i + 1,
                total_installments: data.total_installments,
                amount: installment_amount,
                description: data.description,
                due_date: dueDate.toISOString().split('T')[0],
                is_paid: false,
                transaction_id: null,
            };
        });

        const { error } = await supabase
            .from('installments')
            .insert(installments);

        if (error) throw error;
    },
    async getInstallments(id: string, start: string, end: string) {
        return supabase
            .from('installments')
            .select('*')
            .eq('payment_method_id', id)
            .gte('due_date', start)
            .lte('due_date', end)
            .order('due_date', { ascending: false });
    },
    async markAsPaid(id: string, transactionId: string) {
        return supabase
            .from('installments')
            .update({
                is_paid: true,
                paid_date: new Date().toISOString().split('T')[0],
                paid_transaction_id: transactionId,
            })
            .eq('id', id);
    },
    async markManyAsPaid(ids: string[], transactionId: string) {
        return supabase
            .from('installments')
            .update({
                is_paid: true,
                paid_date: new Date().toISOString().split('T')[0],
                paid_transaction_id: transactionId,
            })
            .in('id', ids);
    },
    async resetByPaidTransactionId(transactionId: string) {
        return supabase
            .from('installments')
            .update({
                is_paid: false,
                paid_date: null,
                paid_transaction_id: null,
            })
            .eq('paid_transaction_id', transactionId);
    },
    async deleteMany(ids: string[]) {
        return supabase
            .from('installments')
            .delete()
            .in('id', ids);
    },
    async getByDescriptionAndPaymentMethod(description: string, paymentMethodId: string) {
        return supabase
            .from('installments')
            .select('*')
            .eq('description', description)
            .eq('payment_method_id', paymentMethodId);
    }
};
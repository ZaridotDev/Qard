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
    }
};
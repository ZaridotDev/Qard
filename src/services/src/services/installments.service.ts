import { supabase } from "../../../core/supabase/client";

export type TransactionWithInstallmentsInsert = {
    payment_method_id: string;
    amount: number;
    description: string;
    total_installments: number;
    installment_amount: number;
};

export const installmentsService = {
    async insertWithInstallments(data: TransactionWithInstallmentsInsert) {
        // 1. Insertar la transacción
        const { data: transaction, error: transactionError } = await supabase
            .from('transactions')
            .insert({
                payment_method_id: data.payment_method_id,
                type: 'expense',
                amount: data.amount,
                description: data.description,
                transaction_date: new Date().toISOString().split('T')[0],
                has_installments: true,
                total_installments: data.total_installments,
                installment_amount: data.installment_amount,
            })
            .select()
            .single();

        if (transactionError) throw transactionError;

        // 2. Generar las cuotas
        const installments = Array.from({ length: data.total_installments }, (_, i) => {
            const dueDate = new Date();
            dueDate.setMonth(dueDate.getMonth() + i + 1);
            return {
                transaction_id: transaction.id,
                installment_number: i + 1,
                amount: data.installment_amount,
                due_date: dueDate.toISOString().split('T')[0],
                is_paid: false,
            };
        });

        // 3. Insertar todas las cuotas
        const { error: installmentsError } = await supabase
            .from('installments')
            .insert(installments);

        if (installmentsError) throw installmentsError;

        return transaction;
    }
};
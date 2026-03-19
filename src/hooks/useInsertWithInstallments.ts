import { useState } from "react";
import { InstallmentPurchaseInsert, installmentsService,  } from "../services/src/services/installments.service";

export function useInsertWithInstallments() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const insert = async (data: InstallmentPurchaseInsert) => {
        setLoading(true);
        setError(null);
        try {
            const result = await installmentsService.insertWithInstallments(data);
            return result;
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { insert, loading, error };
}
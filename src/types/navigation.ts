// Params entre pantallas

export type Category = {
    id: string;
    name: string;
    budgets: { id: string; amount: number }[];
};
export type Purchase = {
    // datos a pasar por Historial
};

// Pantallas

export type HamburguerDrawerParams = {
    Home: undefined;
    Analytics: undefined;
    Session: undefined;
};
export type HomeStackParams = {
    Home: undefined;
    Debit: undefined;
    Credit: undefined;
};

export type DebitTabParams = {
    Wallets: undefined;
    History: undefined;
    Recurrents: undefined;
};
export type CreditTabParams = {
    ShowEgress: undefined;
    AddEgress: undefined;
    AddCard: undefined;
};

export type WalletsStackParams = {
    Wallets: undefined;
    Calculator: { category: Category };
};
export type HistoryStackParams = {
    History: undefined;
    Details: { purchase: Purchase };
};


// Params entre pantallas

export type Category = {
    id: string;
    name: string;
    budgets: { id: string; amount: number }[];
};

export type ShoppingItemsType = {
    description: string;
    price: number;
    quantity: number;
}

// Pantallas

export type HamburguerDrawerParams = {
    Home: undefined;
    Analytics: undefined;
    Session: undefined;
};
export type HomeStackParams = {
    Home: undefined | { visible: boolean };
    NavMenu: undefined
};

export type NavMenuStackParams = {
    NavMenu: undefined;
    Credit: undefined;
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
    Details: { 
        transactionName: string,
        transactionAmount: number,
        transactionDate: string,
        shoppingItems: ShoppingItemsType[],
    };
};


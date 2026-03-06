// utils/currency.ts

type Currency = 'ARS' | 'USD' | 'EUR' | 'BRL';

const CURRENCY_CONFIG: Record<Currency, { locale: string; currency: string }> = {
    ARS: { locale: 'es-AR', currency: 'ARS' },
    USD: { locale: 'en-US', currency: 'USD' },
    EUR: { locale: 'de-DE', currency: 'EUR' },
    BRL: { locale: 'pt-BR', currency: 'BRL' },
};

export function formatCurrency(amount: number, currency: Currency = 'ARS'): string {
    const config = CURRENCY_CONFIG[currency];
    return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency,
        minimumFractionDigits: 0,
    }).format(amount);
}
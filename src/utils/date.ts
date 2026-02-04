/** Parsea "YYYY-MM-DD" como fecha local (evita diferencias por timezone entre emulador y dispositivo). */
export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d); // month is 0-indexed in Date
}

export function getMonthRange(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
    const toISO = (d: Date) => d.toISOString().split('T')[0];
  
    return {
      startCurrentMonth: toISO(start), // YYYY-MM-DD
      endCurrentMonth: toISO(end),
    };
  }
  
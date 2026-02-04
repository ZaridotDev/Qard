export function formatDateForUI(date: string) {
    const d = new Date(date);
  
    return d.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
    });
  }
 
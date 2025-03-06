export function formatDate(isoString: string) {
    const date = new Date(isoString);

    // Format the date as "03 Sept 2024, 02:35 PM"
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date).replace(',', '');
}

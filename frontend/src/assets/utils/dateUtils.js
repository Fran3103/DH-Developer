export function expandRangesToDates(ranges) {
    const blockedDates = [];

    // Recorre cada rango de fechas y expande a fechas individuales
    ranges.forEach(ranges => {
        const start = new Date(ranges.startDate + "T00:00:00");
        const end = new Date(ranges.endDate + "T00:00:00");

        // Asegura que la fecha de inicio no sea posterior a la fecha de fin
        let cursor = new Date(start);
        // Itera desde la fecha de inicio hasta la fecha de fin
        while (cursor <= end) {
            blockedDates.push(new Date(cursor));
            cursor.setDate(cursor.getDate() + 1);
        }
    });

    // Devuelve el array de fechas bloqueadas

    return blockedDates;
}

//  Función para verificar si dos fechas son el mismo día

export function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}



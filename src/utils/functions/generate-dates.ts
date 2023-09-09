export function generateDates(start: string, end: string){
    const startDate: Date = new Date();
    startDate.setHours(parseInt(start.split(':')[0]));
    startDate.setMinutes(parseInt(start.split(':')[1]))

    const endDate: Date = new Date();
    endDate.setHours(parseInt(end.split(':')[0]));
    endDate.setMinutes(parseInt(end.split(':')[1]))

    return {
        startDate,
        endDate
    }
}
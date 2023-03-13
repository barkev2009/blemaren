export const addDays = (date, days = 1) => {
    date.setDate(date.getDate() + days);
    return date;
}
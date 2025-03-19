import { format, startOfWeek, addDays } from 'date-fns';

export const generateCalendarDays = (selectedDate: Date) => {
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 }); // Start of the week (Sunday)
  const calendarDays = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(startDate, i);
    const day = format(date, 'E');
    const dateNumber = format(date, 'd');

    calendarDays.push({
      day,
      date: parseInt(dateNumber, 10),
      selected: date.toDateString() === selectedDate.toDateString(), // Check if the date is selected
    });
  }

  return calendarDays;
};

// src/constants/days.js
export const DAYS_OF_WEEK = {
  SUNDAY: 'Sunday',
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday'
};

export const DAYS_ARRAY = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const SHORT_DAYS = {
  SUNDAY: 'Sun',
  MONDAY: 'Mon',
  TUESDAY: 'Tue',
  WEDNESDAY: 'Wed',
  THURSDAY: 'Thu',
  FRIDAY: 'Fri',
  SATURDAY: 'Sat'
};

export const getCurrentDay = () => {
  return DAYS_ARRAY[new Date().getDay()];
};

export const isValidDay = (day) => {
  return DAYS_ARRAY.includes(day);
};

export const getShortDay = (day) => {
  return SHORT_DAYS[
    Object.keys(DAYS_OF_WEEK).find(key => 
      DAYS_OF_WEEK[key] === day
    )
  ];
};

export const getNextDay = (currentDay) => {
  const currentIndex = DAYS_ARRAY.indexOf(currentDay);
  return DAYS_ARRAY[(currentIndex + 1) % 7];
};
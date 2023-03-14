const START_DAY = new Date('2023-02-13T00:00:00');
const currentDate = new Date();

const currentWeek =
  Math.ceil(
    (currentDate.getTime() - START_DAY.getTime()) / (7 * 24 * 60 * 60 * 1000)
  ) & 1
    ? 'Числитель'
    : 'Знаменатель';

document.getElementById('week-type').innerHTML = currentWeek;

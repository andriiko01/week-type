const START_DAY = new Date('2023-02-13T00:00:00');
const dateInput = document.getElementById('date');
const weekTypeElement = document.getElementById('week-type');

function getWeekType(date) {
  const currentWeek =
    Math.ceil(
      (date.getTime() - START_DAY.getTime()) / (7 * 24 * 60 * 60 * 1000)
    ) & 1
      ? 'Числитель'
      : 'Знаменатель';

  return currentWeek;
}

document.addEventListener('DOMContentLoaded', () => {
  const date = new Date();
  const dateString = date.toJSON();
  dateInput.value = dateString.slice(0, dateString.indexOf('T'));
  weekTypeElement.innerHTML = getWeekType(date);
});

dateInput.addEventListener('change', e => {
  weekTypeElement.innerHTML = getWeekType(new Date(e.target.value));
});

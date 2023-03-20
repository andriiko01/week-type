const START_DAY = new Date('2023-02-13T00:00:00');
const dateInput = document.getElementById('date');
const weekTypeElement = document.getElementById('week-type');
const weeksPassedElement = document.getElementById('weeks-passed');
const weekScheduleElement = document.getElementById('week-schedule');

let isFinished = false;
const WEEKS_SCHEDULE = [
  'Т',
  'Т',
  'Т',
  'Т',
  'Т',
  'Т',
  'Т',
  'Т',
  'Т',
  'Т',
  'Т',
  'Т',
  'ЗТ',
  'С',
  'С',
  'ВП',
  'ВП',
  'ВП',
  'ВП',
];

function getWeekType(date) {
  return getWeeksPassed(date) & 1 ? 'Чисельник' : 'Знаменник';
}

function getWeeksPassed(date) {
  return Math.ceil((date - START_DAY) / (7 * 24 * 60 * 60 * 1000));
}

function checkIsFinished(date) {}

function getWeeksSchedule(key) {
  switch (key) {
    case 'ЗТ':
      return 'Заліковий тиждень';
    case 'С':
      return 'Сесія';
    case 'ВП':
      return 'Виробнича практика';
    case 'Т':
    default:
      return 'Навчальний тиждень';
  }
}

function updateContent(date) {
  const weekNumber = getWeeksPassed(date);
  const weekKey = WEEKS_SCHEDULE[weekNumber - 1];
  const currentWeek = weekNumber - WEEKS_SCHEDULE.findIndex(e => e === weekKey);
  const weeks = WEEKS_SCHEDULE.filter(e => e === weekKey).length;

  weekTypeElement.innerHTML = getWeekType(date);
  weeksPassedElement.innerHTML = `${currentWeek}/${weeks}`;
  weekScheduleElement.innerHTML = getWeeksSchedule(weekKey);
}

dateInput.addEventListener('change', e => {
  const date = new Date(e.target.value);
  updateContent(date);
});

document.addEventListener('DOMContentLoaded', () => {
  const date = new Date();
  updateContent(date);

  const dateString = date.toJSON();
  dateInput.value = dateString.slice(0, dateString.indexOf('T'));
});

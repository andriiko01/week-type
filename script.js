const START_DATE = new Date('2023-09-04T00:00:00');
const END_DATE = new Date('2024-06-23T00:00:00');

const dateInput = document.getElementById('date');
const weekTypeElement = document.getElementById('week-type');
const weeksPassedElement = document.getElementById('weeks-passed');
const weekScheduleElement = document.getElementById('week-schedule');

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
  'Т',
  'ЗТ',
  'С',
  'С',
  'К',
  'К',
  'К',
  'К',
  'К',
  'К',
  'К',
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
  'КР',
  'КР',
  'КР',
  'КР',
  'КР',
  'ПА',
];

function getDateStringNumber(dateNumber) {
  return `${dateNumber < 10 ? 0 : ''}${dateNumber}`;
}

function getDateString(date) {
  const year = getDateStringNumber(date.getFullYear());
  const month = getDateStringNumber((date.getMonth() + 1) % 12);
  const day = getDateStringNumber(date.getDate());
  return `${year}-${month}-${day}`;
}

function getWeekType(date) {
  return getWeeksPassed(date) & 1 ? 'Чисельник' : 'Знаменник';
}

function getWeeksPassed(date) {
  return Math.ceil((date - START_DATE) / (7 * 24 * 60 * 60 * 1000));
}

function getWeeksSchedule(key) {
  switch (key) {
    case 'ЗТ':
      return 'Заліковий тиждень';
    case 'С':
      return 'Екзаменаційна сесія';
    case 'ВП':
      return 'Виробнича практика';
    case 'К':
      return 'Канікули';
    case 'КР':
      return 'Підготовка кваліфікаційної роботи';
    case 'ПА':
      return 'Підсумкова атестація';
    case 'Т':
    default:
      return 'Теоретичне навчання';
  }
}

function getWeeksScheduleNumber(weekNumber) {
  let firstIndex = weekNumber;
  let lastIndex = weekNumber;

  const targetValue = WEEKS_SCHEDULE[weekNumber];

  while (firstIndex > 0 && WEEKS_SCHEDULE[firstIndex - 1] === targetValue) {
    firstIndex--;
  }

  while (lastIndex < WEEKS_SCHEDULE.length - 1 && WEEKS_SCHEDULE[lastIndex + 1] === targetValue) {
    lastIndex++;
  }

  return [firstIndex, lastIndex];
}

function updateContent(date) {
  const weekNumber = getWeeksPassed(date);
  const [firstIndex, lastIndex] = getWeeksScheduleNumber(weekNumber - 1);

  const weekKey = WEEKS_SCHEDULE[weekNumber - 1];
  const currentWeek = weekNumber - firstIndex;
  const weeks = lastIndex - firstIndex + 1;

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

  dateInput.value = getDateString(date);
  dateInput.setAttribute('min', getDateString(START_DATE));
  dateInput.setAttribute('max', getDateString(END_DATE));
});

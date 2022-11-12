import dayjs, {Dayjs} from 'dayjs';

export const fillEmptyColumns = (
  columns: dayjs.Dayjs[],
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
) => {
  const filledColumns = columns.slice(0);

  // 1. 첫날 이전 공백 채우기
  const startDay = dayjs(start).get('day');
  for (let i = 1; i <= startDay; i += 1) {
    const date = dayjs(start).subtract(i, 'day');
    filledColumns.unshift(date);
  }
  // 2. 마지막날 이후 공백 채우기
  const endDay = dayjs(end).get('day');
  /**
    0 -> 6
    1 -> 5
    2 -> 4
    endDay + ? = 6
   */
  for (let i = 1; i <= 6 - endDay; i += 1) {
    const date = dayjs(end).add(i, 'day');
    filledColumns.push(date);
  }

  return filledColumns;
};
export const getCalendarColumns = (now: Dayjs) => {
  const start = dayjs(now).startOf('month');
  const end = dayjs(now).endOf('month');
  const endDate = dayjs(end).get('date');

  const columns = [];
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, 'day');
    columns.push(date);
  }

  const filledColumns = fillEmptyColumns(columns, start, end);
  return filledColumns;
};

const SUN_IDX = 0;
const SAT_IDX = 6;
export const getColorByDay = (day: number) => {
  return day === SUN_IDX ? 'pink' : day === SAT_IDX ? 'blue' : '#2b2b2b';
};
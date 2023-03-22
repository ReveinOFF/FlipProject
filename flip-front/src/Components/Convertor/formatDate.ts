const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = 60 * MILLISECONDS_IN_SECOND;
const MILLISECONDS_IN_HOUR = 60 * MILLISECONDS_IN_MINUTE;
const MILLISECONDS_IN_DAY = 24 * MILLISECONDS_IN_HOUR;
const MILLISECONDS_IN_WEEK = 7 * MILLISECONDS_IN_DAY;
const MILLISECONDS_IN_MONTH = 30 * MILLISECONDS_IN_WEEK;
const MILLISECONDS_IN_YEAR = 365 * MILLISECONDS_IN_MONTH;

export const formatDate = (date: Date) => {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - date.getTime();

  if (timeDifference <= MILLISECONDS_IN_SECOND * 5) {
    return "Прямо сейчас";
  } else if (timeDifference < MILLISECONDS_IN_MINUTE) {
    const secondsAgo = Math.floor(timeDifference / MILLISECONDS_IN_SECOND);
    return `${secondsAgo} сек. назад`;
  } else if (timeDifference < MILLISECONDS_IN_HOUR) {
    const minutesAgo = Math.floor(timeDifference / MILLISECONDS_IN_MINUTE);
    return `${minutesAgo} мин. назад`;
  } else if (timeDifference < MILLISECONDS_IN_DAY) {
    const hoursAgo = Math.floor(timeDifference / MILLISECONDS_IN_HOUR);
    return `${hoursAgo} ч. назад`;
  } else if (timeDifference < MILLISECONDS_IN_WEEK) {
    const dayAgo = Math.floor(timeDifference / MILLISECONDS_IN_DAY);
    return `${dayAgo} д. назад`;
  } else if (timeDifference < MILLISECONDS_IN_MONTH) {
    const weekAgo = Math.floor(timeDifference / MILLISECONDS_IN_WEEK);
    return `${weekAgo} нед. назад`;
  } else if (timeDifference < MILLISECONDS_IN_YEAR) {
    const monthAgo = Math.floor(timeDifference / MILLISECONDS_IN_MONTH);
    return `${monthAgo} мес. назад`;
  } else if (timeDifference >= MILLISECONDS_IN_YEAR) {
    const ageAgo = Math.floor(timeDifference / MILLISECONDS_IN_MONTH);
    return `${ageAgo} л. назад`;
  }

  let format = (n) => (n < 10 ? "0" + n : n);

  return `${format(date.getHours())}:${format(date.getMinutes())} ${format(
    date.getDate()
  )}.${format(date.getMonth() + 1)}.${format(date.getFullYear() % 100)}`;
};

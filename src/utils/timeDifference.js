import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export function timeAgo(timestamp) {
  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  const minutesAgo = differenceInMinutes(currentDate, targetDate);
  const hoursAgo = differenceInHours(currentDate, targetDate);
  const daysAgo = differenceInDays(currentDate, targetDate);
  const monthsAgo = differenceInMonths(currentDate, targetDate);
  const yearsAgo = differenceInYears(currentDate, targetDate);

  if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  } else if (daysAgo < 30) {
    return `${daysAgo} days ago`;
  } else if (monthsAgo < 12) {
    return `${monthsAgo} months ago`;
  } else {
    return `${yearsAgo} years ago`;
  }
}

import { differenceInSeconds, format, parseISO } from "date-fns";

/**
 * @param {string} createdAt - The date should be ISO date string
 */
function displayRelativeTime(createdAt) {
  const todayDate = new Date();
  createdAt = parseISO(createdAt);
  const seconds = differenceInSeconds(todayDate, createdAt);

  const intervals = [
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
    { label: "s", seconds: 1 },
  ];

  for (const interval of intervals) {
    const intervalValue = Math.floor(seconds / interval.seconds);
    if (intervalValue >= 1) {
      return `${intervalValue}${interval.label}`;
    }
  }
  return "just now";
}
/**
 * @param {string} createdAt - The date should be ISO date string
 */
function displayPostAndCommentDate(createdDate) {
  createdDate = parseISO(createdDate);
  return format(createdDate, "MMM dd, hh:mm a");
}

export const Dates = {
  displayRelativeTime,
  displayPostAndCommentDate,
};

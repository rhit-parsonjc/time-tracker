import { sortTimeEntries, TimeEntry } from "./TimeEntry";
import { determineDuration } from "./TimeValue";

export function numberToString(num: number, digits: number): string {
  let numString: string = num + "";
  while (numString.length < digits) numString = "0" + numString;
  return numString;
}

export function wrapClickHandler(clickHandler: () => void) {
  return function (e: React.KeyboardEvent<HTMLElement>) {
    if (e.code === "Enter") {
      clickHandler();
    }
  };
}

export interface Stats {
  date: string;
  timesPerCategory: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function computeStatistics(
  timeEntries: TimeEntry[],
  categories: string[]
): Stats[] {
  const sortedTimeEntries: TimeEntry[] = [...timeEntries].sort(sortTimeEntries);
  let lastDate = "";
  const statsList: Stats[] = [];
  for (const sortedTimeEntry of sortedTimeEntries) {
    const { date, category, startTime, endTime } = sortedTimeEntry;
    const duration = determineDuration(startTime, endTime);
    if (date === lastDate) {
      const lastTimeEntry: Stats = statsList[statsList.length - 1];
      lastTimeEntry.timesPerCategory[category] += duration;
    } else {
      const timesPerCategory: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
      for (const categoryName of categories) timesPerCategory[categoryName] = 0;
      timesPerCategory[category] += duration;
      lastDate = date;
      statsList.push({ date, timesPerCategory });
    }
  }
  return statsList;
}

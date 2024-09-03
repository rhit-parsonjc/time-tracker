import { convertStringToTimeValue } from "./TimeValue";
import { TimeValue } from "./TimeValue";

type DateValue = {
  month: number;
  day: number;
  year: number;
};

export type TimeEntry = {
  description: string;
  category: string;
  date: string;
  startTime: TimeValue;
  endTime: TimeValue;
};

export function createTimeEntry(
  description: string,
  category: string,
  date: string,
  startTime: string,
  endTime: string
) {
  return {
    description,
    category,
    date,
    startTime: convertStringToTimeValue(startTime),
    endTime: convertStringToTimeValue(endTime),
  };
}

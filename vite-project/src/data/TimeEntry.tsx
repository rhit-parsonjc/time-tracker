import { TimeEntryResult, TimeValueResult } from "./LoadTypes";
import { convertStringToTimeValue, determineDuration } from "./TimeValue";
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
  startTimeString: string,
  endTimeString: string
): TimeEntryResult {
  const startTime: TimeValueResult = convertStringToTimeValue(startTimeString);
  if (startTime.error)
    return { error: true, errorMessage: "Could not convert start time" };
  const endTime: TimeValueResult = convertStringToTimeValue(endTimeString);
  if (endTime.error)
    return { error: true, errorMessage: "Could not convert end time" };
  if (determineDuration(startTime.value, endTime.value) <= 0)
    return { error: true, errorMessage: "End time is not after start time" };
  const timeEntry: TimeEntry = {
    description,
    category,
    date,
    startTime: startTime.value,
    endTime: endTime.value,
  };
  return { error: false, value: timeEntry };
}

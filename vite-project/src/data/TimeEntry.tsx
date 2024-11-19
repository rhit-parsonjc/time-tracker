import { TimeEntryResult, TimeValueResult } from "./LoadTypes";
import {
  convertStringToTimeValue,
  convertToNumber,
  determineDuration,
} from "./TimeValue";
import { TimeValue } from "./TimeValue";
import { v4 as uuid } from "uuid";

export interface TimeEntry {
  id: string;
  description: string;
  category: string;
  date: string;
  startTime: TimeValue;
  endTime: TimeValue;
}

export function createTimeEntry(
  id: string | null,
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
  if (endTime.value.hours === 0 && endTime.value.minutes === 0)
    endTime.value.hours = 24;
  if (determineDuration(startTime.value, endTime.value) <= 0)
    return { error: true, errorMessage: "End time is not after start time" };
  const timeEntry: TimeEntry = {
    id: id === null ? uuid() : id,
    description,
    category,
    date,
    startTime: startTime.value,
    endTime: endTime.value,
  };
  return { error: false, value: timeEntry };
}

export function sortTimeEntries(a: TimeEntry, b: TimeEntry) {
  if (a.date > b.date) return 1;
  else if (a.date < b.date) return -1;
  else {
    const timeInterval = determineDuration(b.startTime, a.startTime);
    if (timeInterval !== 0) return timeInterval;
    else return determineDuration(b.endTime, a.endTime);
  }
}

export function timeEntryOverlap(
  currTimeEntry: TimeEntry,
  timeEntries: TimeEntry[]
): TimeEntry[] {
  const { id, date: currTimeEntryDate, startTime, endTime } = currTimeEntry;
  const currTimeEntryStart = convertToNumber(startTime);
  const currTimeEntryEnd = convertToNumber(endTime);
  const overlappingTimeEntries = [];
  for (const timeEntry of timeEntries) {
    if (timeEntry.date === currTimeEntryDate && timeEntry.id !== id) {
      const timeEntryStart = convertToNumber(timeEntry.startTime);
      const timeEntryEnd = convertToNumber(timeEntry.endTime);
      if (
        currTimeEntryEnd > timeEntryStart &&
        currTimeEntryStart < timeEntryEnd
      ) {
        overlappingTimeEntries.push(timeEntry);
      }
    }
  }
  return overlappingTimeEntries;
}

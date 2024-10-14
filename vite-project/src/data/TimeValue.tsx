import { TimeValueResult } from "./LoadTypes";
import { numberToString } from "./Utilities";

export interface TimeValue {
  hours: number;
  minutes: number;
}

export function convertStringToTimeValue(timeString: string): TimeValueResult {
  const colonIndex: number = timeString.indexOf(":");
  if (colonIndex === -1)
    return { error: true, errorMessage: "Could not find colon in string" };
  const hourString: string = timeString.substring(0, colonIndex);
  const minuteString: string = timeString.substring(colonIndex + 1);
  let hours = 0;
  try {
    hours = parseInt(hourString);
    if (hours < 0 || hours > 24)
      return { error: true, errorMessage: "Hour value out of range" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      error: true,
      errorMessage: "Could not parse portion before colon as an hour",
    };
  }
  let minutes = 0;
  try {
    minutes = parseInt(minuteString);
    if (minutes < 0 || minutes >= 60 || (hours === 24 && minutes !== 0))
      return { error: true, errorMessage: "Minute value out of range" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      error: true,
      errorMessage: "Could not parse portion after colon as a minute",
    };
  }
  const timeValue: TimeValue = { hours, minutes };
  return { error: false, value: timeValue };
}

export function formatTimeValue(timeValue: TimeValue): string {
  const { hours, minutes } = timeValue;
  if (hours === 0 && minutes === 0) return "START";
  if (hours === 24 && minutes === 0) return "END";
  const pm: boolean = hours >= 12;
  const hoursUpdated: number = (pm ? hours - 12 : hours) || 12;
  return hoursUpdated + ":" + numberToString(minutes, 2) + (pm ? " PM" : " AM");
}

export function formatTimeValue24Hour(timeValue: TimeValue): string {
  return (
    numberToString(timeValue.hours, 2) +
    ":" +
    numberToString(timeValue.minutes, 2)
  );
}

export function determineDuration(
  startTime: TimeValue,
  endTime: TimeValue
): number {
  return (
    (endTime.hours - startTime.hours) * 60 +
    (endTime.minutes - startTime.minutes)
  );
}

export function formatDuration(minutesTotal: number): string {
  const minutes: number = minutesTotal % 60;
  const hours: number = (minutesTotal - minutes) / 60;
  const hoursText: string = hours > 0 ? hours + "h" : "";
  const minutesText: string = minutes > 0 ? minutes + "m" : "";
  return hoursText + (hours && minutes ? " " : "") + minutesText;
}

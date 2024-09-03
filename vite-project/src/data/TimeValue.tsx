import { numberToString } from "./Utilities";

export type TimeValue = {
  hours: number;
  minutes: number;
};

export function convertStringToTimeValue(timeString: string) {
  const colon: number = timeString.indexOf(":");
  const hourString: string = timeString.substring(0, colon);
  const minuteString: string = timeString.substring(colon + 1);
  const hourNumber: number = parseInt(hourString);
  const minuteNumber: number = parseInt(minuteString);
  const timeValue: TimeValue = { hours: hourNumber, minutes: minuteNumber };
  return timeValue;
}

export function formatTimeValue(timeValue: TimeValue) {
  const { hours, minutes } = timeValue;
  const pm: boolean = hours >= 12;
  const hoursUpdated: number = (pm ? hours - 12 : hours) || 12;
  return hoursUpdated + ":" + numberToString(minutes, 2) + (pm ? " PM" : " AM");
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

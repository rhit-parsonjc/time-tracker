import { numberToString } from "./Utilities";

export type TimeValue = {
  hours: number;
  minutes: number;
};

export function convertStringToTimeValue(
  timeString: string
): TimeValue | string {
  const colonIndex: number = timeString.indexOf(":");
  if (colonIndex === -1) return "Could not find colon in string";
  const hourString: string = timeString.substring(0, colonIndex);
  const minuteString: string = timeString.substring(colonIndex + 1);
  let hours: number = 0;
  try {
    hours = parseInt(hourString);
    if (hours < 0 || hours >= 24) return "Hour value out of range";
  } catch (e) {
    return "Could not parse portion before colon as an hour";
  }
  let minutes: number = 0;
  try {
    minutes = parseInt(minuteString);
    if (minutes < 0 || minutes >= 60) return "Minute value out of range";
  } catch (e) {
    return "Could not parse portion after colon as a minute";
  }
  const timeValue: TimeValue = { hours, minutes };
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

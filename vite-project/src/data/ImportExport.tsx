import { TimeEntry } from "./TimeEntry";
import { convertStringToTimeValue } from "./TimeValue";
import { saveAs } from "file-saver";
import { numberToString } from "./Utilities";
import { TimeEntryListResult, TimeValueResult } from "./LoadTypes";

type fileEventHandler = (e: ProgressEvent<FileReader>) => void;

function readTextFromFile(
  file: File,
  onLoad: fileEventHandler,
  onError: fileEventHandler
): void {
  const reader: FileReader = new FileReader();
  reader.addEventListener("load", onLoad);
  reader.addEventListener("error", onError);
  reader.readAsText(file);
}

function convertTextToTimeEntries(text: string): TimeEntryListResult {
  const lines: string[] = text.split(/\r?\n/);
  const timeEntries: TimeEntry[] = [];
  for (const line of lines) {
    if (line === "") continue;
    const tabSeparatedComponents: string[] = line.split("\t");
    if (tabSeparatedComponents.length !== 5)
      return {
        error: true,
        errorMessage: "Line does not contain 5 separate parts",
      };
    const [category, description, date, startTimeString, endTimeString] =
      tabSeparatedComponents;
    const startTime: TimeValueResult =
      convertStringToTimeValue(startTimeString);
    if (startTime.error)
      return { error: true, errorMessage: "Could not convert start time" };
    const endTime: TimeValueResult = convertStringToTimeValue(endTimeString);
    if (endTime.error)
      return { error: true, errorMessage: "Could not convert end time" };
    const timeEntry: TimeEntry = {
      category,
      description,
      date,
      startTime: startTime.value,
      endTime: endTime.value,
    };
    timeEntries.push(timeEntry);
  }
  return { error: false, value: timeEntries };
}

export function importTimeEntries(
  file: File,
  onLoad: (timeEntries: TimeEntry[]) => void,
  onError: (errorMsg: string) => void
): void {
  readTextFromFile(
    file,
    (e) => {
      const fileContents = e.target?.result;
      if (typeof fileContents === "string") {
        const timeEntries: TimeEntryListResult =
          convertTextToTimeEntries(fileContents);
        if (!timeEntries.error) onLoad(timeEntries.value);
        else onError("File not in valid format");
      } else onError("Could not read text from file");
    },
    () => onError("Error in reading text from file")
  );
}

export function writeTimeEntries(timeEntries: TimeEntry[]): void {
  const lines: string[] = timeEntries.map((timeEntry) => {
    const { category, description, date, startTime, endTime } = timeEntry;
    return (
      category +
      "\t" +
      description +
      "\t" +
      date +
      "\t" +
      startTime.hours +
      ":" +
      numberToString(startTime.minutes, 2) +
      "\t" +
      endTime.hours +
      ":" +
      numberToString(endTime.minutes, 2) +
      "\n"
    );
  });
  const file: Blob = new Blob(lines);
  saveAs(file, "entries.txt");
}

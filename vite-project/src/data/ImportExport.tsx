import { TimeEntry } from "./TimeEntry";
import {
  convertStringToTimeValue,
  formatTimeValue,
  TimeValue,
} from "./TimeValue";
import { saveAs } from "file-saver";
import { numberToString } from "./Utilities";

type fileEventHandler = (e: ProgressEvent<FileReader>) => void;

function readTextFromFile(
  file: File,
  onLoad: fileEventHandler,
  onError: fileEventHandler
) {
  const reader: FileReader = new FileReader();
  reader.addEventListener("load", onLoad);
  reader.addEventListener("error", onError);
  reader.readAsText(file);
}

function convertTextToTimeEntries(text: string): TimeEntry[] | string {
  const lines: string[] = text.split(/\r?\n/);
  const timeEntries: TimeEntry[] = [];
  for (const line of lines) {
    if (line === "") continue;
    const tabSeparatedComponents: string[] = line.split("\t");
    if (tabSeparatedComponents.length !== 5)
      return "Line does not contain 5 separate parts";
    const [category, description, date, startTimeString, endTimeString] =
      tabSeparatedComponents;
    const startTime: string | TimeValue =
      convertStringToTimeValue(startTimeString);
    if (typeof startTime === "string") return "Could not convert start time";
    const endTime: string | TimeValue = convertStringToTimeValue(endTimeString);
    if (typeof endTime === "string") return "Could not convert end time";
    const timeEntry = {
      category,
      description,
      date,
      startTime,
      endTime,
    };
    timeEntries.push(timeEntry);
  }
  return timeEntries;
}

export function importTimeEntries(
  file: File,
  onLoad: (timeEntries: TimeEntry[]) => void,
  onError: (errorMsg: string) => void
) {
  readTextFromFile(
    file,
    (e) => {
      const fileContents = e.target?.result;
      if (typeof fileContents === "string") {
        const timeEntries: TimeEntry[] | string =
          convertTextToTimeEntries(fileContents);
        if (typeof timeEntries !== "string") onLoad(timeEntries);
        else onError("File not in valid format");
      } else onError("Could not read text from file");
    },
    () => onError("Error in reading text from file")
  );
}

export function writeTimeEntries(timeEntries: TimeEntry[]) {
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

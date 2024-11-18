import { TimeEntry } from "./TimeEntry";
import { convertStringToTimeValue, formatTimeValue24Hour } from "./TimeValue";
import { saveAs } from "file-saver";
import { TimeEntryListAndCategoriesResult, TimeValueResult } from "./LoadTypes";
import { v4 as uuid } from "uuid";

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

function convertTextToTimeEntries(
  text: string
): TimeEntryListAndCategoriesResult {
  const lines: string[] = text.split(/\r?\n/);
  const timeEntries: TimeEntry[] = [];
  const categories: string[] = ["Unknown"];
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
    if (!categories.includes(category)) categories.push(category);
    const startTime: TimeValueResult =
      convertStringToTimeValue(startTimeString);
    if (startTime.error)
      return { error: true, errorMessage: "Could not convert start time" };
    const endTime: TimeValueResult = convertStringToTimeValue(endTimeString);
    if (endTime.error)
      return { error: true, errorMessage: "Could not convert end time" };
    const timeEntry: TimeEntry = {
      id: uuid(),
      category,
      description,
      date,
      startTime: startTime.value,
      endTime: endTime.value,
    };
    timeEntries.push(timeEntry);
  }
  categories.shift();
  categories.sort();
  categories.unshift("Unknown");
  return { error: false, value: { timeEntries, categories } };
}

export function importTimeEntries(
  file: File,
  onLoad: (timeEntries: TimeEntry[], categories: string[]) => void,
  onError: (errorMsg: string) => void
): void {
  readTextFromFile(
    file,
    (e) => {
      const fileContents = e.target?.result;
      if (typeof fileContents === "string") {
        const timeEntries: TimeEntryListAndCategoriesResult =
          convertTextToTimeEntries(fileContents);
        if (!timeEntries.error)
          onLoad(timeEntries.value.timeEntries, timeEntries.value.categories);
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
      formatTimeValue24Hour(startTime) +
      "\t" +
      formatTimeValue24Hour(endTime) +
      "\n"
    );
  });
  const file: Blob = new Blob(lines);
  saveAs(file, "entries.txt");
}

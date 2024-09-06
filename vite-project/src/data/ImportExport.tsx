import { TimeEntry } from "./TimeEntry";
import { convertStringToTimeValue } from "./TimeValue";

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

function convertTextToTimeEntries(text: string): TimeEntry[] | null {
  const lines: string[] = text.split(/\r?\n/);
  const timeEntries: TimeEntry[] = [];
  for (const line of lines) {
    if (line === "") continue;
    const tabSeparatedComponents = line.split("\t");
    const [category, description, date, startTimeString, endTimeString] =
      tabSeparatedComponents;
    const startTime = convertStringToTimeValue(startTimeString);
    const endTime = convertStringToTimeValue(endTimeString);
    const timeEntry = {
      category,
      description,
      date,
      startTime,
      endTime,
    };
    timeEntries.push(timeEntry);
  }
  console.log(timeEntries);
  return timeEntries;
}

export function importTimeEntries(file: File, setTimeEntries: any) {
  readTextFromFile(
    file,
    (e) => {
      const fileContents = e.target?.result;
      if (typeof fileContents == "string") {
        const timeEntries: TimeEntry[] | null =
          convertTextToTimeEntries(fileContents);
        if (timeEntries) {
          setTimeEntries(timeEntries);
        } else {
          console.log("File not in valid format");
        }
      } else {
        console.log("Could not read text from file");
      }
    },
    () => console.log("Error in reading text from file")
  );
}

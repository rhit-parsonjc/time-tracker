import { useState } from "react";
import "./App.css";
import TimeEntryList from "../TimeEntryList/TimeEntryList";
import TimeEntryForm from "../TimeEntryForm/TimeEntryForm";
import { TimeEntry } from "../data/TimeEntry";

function readFromFile(event: React.ChangeEvent<HTMLInputElement>) {
  const fileList = event.target.files;
  if (!fileList) {
    console.log("There are no files to read from.");
  } else {
    const file: File = fileList[0];
    const reader: FileReader = new FileReader();
    reader.addEventListener("load", function (e: ProgressEvent<FileReader>) {
      console.log(e.target?.result);
    });
    reader.addEventListener("error", function (e: ProgressEvent<FileReader>) {
      console.log("Could not read file as text.");
    });
    reader.readAsText(file);
  }
}

function App() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  function addTimeEntry(timeEntry: TimeEntry) {
    setTimeEntries((prevTimeEntries) => [...prevTimeEntries, timeEntry]);
  }
  return (
    <>
      <h1>Add Entry</h1>
      <TimeEntryForm addTimeEntry={addTimeEntry} />
      <h1>List of Entries</h1>
      <TimeEntryList timeEntries={timeEntries} />
      <input type="file" onChange={(e) => readFromFile(e)} />
    </>
  );
}

export default App;

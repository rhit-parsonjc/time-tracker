import { useState } from "react";
import "./App.css";
import TimeEntryList from "../TimeEntryList/TimeEntryList";
import TimeEntryForm from "../TimeEntryForm/TimeEntryForm";
import { TimeEntry } from "../data/TimeEntry";
import { importTimeEntries } from "../data/ImportExport";

function App() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  function addTimeEntry(timeEntry: TimeEntry) {
    setTimeEntries((prevTimeEntries) => [...prevTimeEntries, timeEntry]);
  }
  function handleFileImport(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList: FileList | null = e.target.files;
    if (fileList) {
      importTimeEntries(fileList[0], setTimeEntries);
    } else {
      console.log("No files to read from");
    }
  }
  return (
    <>
      <h1>Add Entry</h1>
      <TimeEntryForm addTimeEntry={addTimeEntry} />
      <h1>List of Entries</h1>
      <TimeEntryList timeEntries={timeEntries} />
      <input type="file" onChange={handleFileImport} />
    </>
  );
}

export default App;

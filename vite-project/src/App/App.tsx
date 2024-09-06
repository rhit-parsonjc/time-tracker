import { useState } from "react";
import "./App.css";
import TimeEntryList from "../TimeEntryList/TimeEntryList";
import TimeEntryForm from "../TimeEntryForm/TimeEntryForm";
import { TimeEntry } from "../data/TimeEntry";
import { importTimeEntries } from "../data/ImportExport";

function App() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [timeEntryErrorMsg, setTimeEntryErrorMsg] = useState<string>("");
  function addTimeEntry(timeEntry: TimeEntry) {
    setTimeEntries((prevTimeEntries) => [...prevTimeEntries, timeEntry]);
  }
  function handleFileImport(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList: FileList | null = e.target.files;
    if (fileList) {
      importTimeEntries(
        fileList[0],
        (timeEntries) => {
          setTimeEntries(timeEntries);
          setTimeEntryErrorMsg("");
        },
        (errorMsg) => setTimeEntryErrorMsg(errorMsg)
      );
    } else {
      console.log("No files to read from");
    }
  }
  return (
    <>
      <h1>Add Entry</h1>
      <TimeEntryForm addTimeEntry={addTimeEntry} />
      <h1>List of Entries</h1>
      <input type="file" onChange={handleFileImport} />
      <p style={{ color: "red" }}>{timeEntryErrorMsg}</p>
      <TimeEntryList timeEntries={timeEntries} />
    </>
  );
}

export default App;

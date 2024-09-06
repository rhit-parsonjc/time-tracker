import { useState } from "react";
import "./App.css";
import TimeEntryList from "../TimeEntryList/TimeEntryList";
import TimeEntryForm from "../TimeEntryForm/TimeEntryForm";
import { TimeEntry } from "../data/TimeEntry";
import ImportExportForm from "../ImportExportForm/ImportExportForm";

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
      <ImportExportForm
        timeEntries={timeEntries}
        modifyTimeEntries={(newTimeEntries) => setTimeEntries(newTimeEntries)}
      />
      <TimeEntryList timeEntries={timeEntries} />
    </>
  );
}

export default App;

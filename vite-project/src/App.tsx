import { useState } from "react";
import "./App.css";
import TimeEntryList from "./TimeEntryList/TimeEntryList";
import TimeEntryForm from "./TimeEntryForm/TimeEntryForm";
import TimeEntry from "./data/TimeEntry";

function App() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  function addTimeEntry(timeEntry: TimeEntry) {
    setTimeEntries((prevTimeEntries) => [...prevTimeEntries, timeEntry]);
  }
  return (
    <>
      <TimeEntryForm addTimeEntry={addTimeEntry} />
      <TimeEntryList timeEntries={timeEntries} />
    </>
  );
}

export default App;

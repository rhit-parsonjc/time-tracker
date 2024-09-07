import { useState } from "react";
import "./App.css";
import TimeEntryList from "../TimeEntryList/TimeEntryList";
import TimeEntryForm from "../TimeEntryForm/TimeEntryForm";
import { TimeEntry } from "../data/TimeEntry";
import ImportForm from "../ImportForm/ImportForm";
import NavBar from "../NavBar/NavBar";

export type TabName = "ADD" | "DELETE" | "IMPORT";

function App() {
  const [selectedTab, setSelectedTab] = useState<TabName>("ADD");
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  function addTimeEntry(timeEntry: TimeEntry) {
    setTimeEntries((prevTimeEntries) => [...prevTimeEntries, timeEntry]);
  }
  return (
    <>
      <NavBar
        tabName={selectedTab}
        setTabName={(tabName) => setSelectedTab(tabName)}
      />
      {selectedTab === "ADD" && <TimeEntryForm addTimeEntry={addTimeEntry} />}
      {selectedTab === "IMPORT" && (
        <ImportForm
          timeEntries={timeEntries}
          modifyTimeEntries={(newTimeEntries) => setTimeEntries(newTimeEntries)}
        />
      )}
      <h1>List of Entries</h1>
      <TimeEntryList timeEntries={timeEntries} />
    </>
  );
}

export default App;

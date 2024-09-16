import { useState } from "react";
import "./App.css";
import TimeEntryList from "../TimeEntryList/TimeEntryList";
import TimeEntryForm from "../TimeEntryForm/TimeEntryForm";
import { TimeEntry } from "../data/TimeEntry";
import ImportForm from "../ImportForm/ImportForm";
import NavBar from "../NavBar/NavBar";
import StatisticsList from "../StatisticsList/StatisticsList";

export type TabName = "ADD" | "DELETE" | "IMPORT" | "STATS";

function App() {
  const [selectedTab, setSelectedTab] = useState<TabName>("ADD");
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [categories, setCategories] = useState<string[]>([
    "Unknown",
    "Work",
    "Tasks",
    "Fun",
    "Religion",
    "Health",
  ]);
  function addTimeEntry(timeEntry: TimeEntry) {
    setTimeEntries((prevTimeEntries) => [...prevTimeEntries, timeEntry]);
  }
  function deleteTimeEntries(index: number) {
    setTimeEntries((prevTimeEntries) =>
      prevTimeEntries.filter((_, i) => i !== index)
    );
  }
  let mainContent = null;
  switch (selectedTab) {
    case "ADD":
      mainContent = (
        <TimeEntryForm addTimeEntry={addTimeEntry} categories={categories} />
      );
      break;
    case "IMPORT":
      mainContent = (
        <ImportForm
          modifyTimeEntries={(newTimeEntries) => setTimeEntries(newTimeEntries)}
        />
      );
      break;
    case "STATS":
      mainContent = (
        <StatisticsList timeEntries={timeEntries} categories={categories} />
      );
  }
  return (
    <>
      <NavBar
        tabName={selectedTab}
        setTabName={(tabName) => setSelectedTab(tabName)}
      />
      {mainContent}
      <h1>List of Entries</h1>
      <TimeEntryList
        timeEntries={timeEntries}
        deletionActive={selectedTab === "DELETE"}
        deleteTimeEntries={deleteTimeEntries}
      />
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import TimeEntryList from "../TimeEntryList/TimeEntryList";
import TimeEntryForm from "../TimeEntryForm/TimeEntryForm";
import { TimeEntry } from "../data/TimeEntry";
import ImportForm from "../ImportForm/ImportForm";
import NavBar from "../NavBar/NavBar";
import StatisticsList from "../StatisticsList/StatisticsList";

export type TabName = "ADD" | "EDIT" | "DELETE" | "IMPORT" | "STATS";

function App() {
  const [selectedTab, setSelectedTab] = useState<TabName>("ADD");
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [categories, _] = useState<string[]>([
    "Unknown",
    "Work",
    "Tasks",
    "Fun",
    "Religion",
    "Health",
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  function addTimeEntry(timeEntry: TimeEntry): void {
    setTimeEntries((prevTimeEntries) => [...prevTimeEntries, timeEntry]);
  }
  function deleteTimeEntries(index: number): void {
    setTimeEntries((prevTimeEntries) =>
      prevTimeEntries.filter((_, i) => i !== index)
    );
  }
  function editTimeEntry(timeEntry: TimeEntry): void {
    setTimeEntries((prevTimeEntries) => {
      const updatedTimeEntries = [...prevTimeEntries];
      updatedTimeEntries[selectedIndex] = timeEntry;
      return updatedTimeEntries;
    });
  }
  function selectTimeEntryForEditing(index: number): void {
    setSelectedIndex(index);
  }
  let mainContent = null;
  switch (selectedTab) {
    case "ADD":
      mainContent = (
        <TimeEntryForm
          createNewEntry={true}
          handleButtonPress={addTimeEntry}
          categories={categories}
        />
      );
      break;
    case "EDIT":
      if (selectedIndex !== -1)
        mainContent = (
          <TimeEntryForm
            createNewEntry={false}
            handleButtonPress={editTimeEntry}
            categories={categories}
            startingTimeEntry={timeEntries[selectedIndex]}
          />
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
        setTabName={(tabName) => {
          setSelectedIndex(-1);
          setSelectedTab(tabName);
        }}
      />
      {mainContent}
      <h1>List of Entries</h1>
      <TimeEntryList
        timeEntries={timeEntries}
        tabName={selectedTab}
        modifyTimeEntry={
          selectedTab === "EDIT"
            ? selectTimeEntryForEditing
            : selectedTab === "DELETE"
            ? deleteTimeEntries
            : () => {}
        }
        selectedIndex={selectedIndex}
      />
    </>
  );
}

export default App;

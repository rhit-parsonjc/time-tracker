import { useState } from "react";
import "./App.css";
import TimeEntryList from "../TimeEntryList/TimeEntryList";
import TimeEntryForm from "../TimeEntryForm/TimeEntryForm";
import { TimeEntry } from "../../data/TimeEntry";
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
  const [selectedId, setSelectedId] = useState<string>("");

  function addTimeEntry(timeEntry: TimeEntry): void {
    setTimeEntries((prevTimeEntries) => [...prevTimeEntries, timeEntry]);
  }
  function deleteTimeEntry(id: string): void {
    setTimeEntries((prevTimeEntries) =>
      prevTimeEntries.filter((timeEntry) => timeEntry.id !== id)
    );
  }
  function editTimeEntry(timeEntry: TimeEntry): void {
    setTimeEntries((prevTimeEntries) =>
      prevTimeEntries.map((prevTimeEntry) =>
        prevTimeEntry.id === selectedId
          ? { ...timeEntry, id: prevTimeEntry.id }
          : prevTimeEntry
      )
    );
  }
  function selectTimeEntryForEditing(id: string): void {
    console.log({ timeEntries, id });
    setSelectedId(id);
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
      if (selectedId !== "") {
        const selectedTimeEntry = timeEntries.find(
          (timeEntry) => timeEntry.id === selectedId
        );
        console.log({ selectedId, selectedTimeEntry, timeEntries });
        if (!selectedTimeEntry) {
          console.log("Time entry not found for editing");
          return null;
        }
        mainContent = (
          <TimeEntryForm
            createNewEntry={false}
            handleButtonPress={editTimeEntry}
            categories={categories}
            startingTimeEntry={selectedTimeEntry}
          />
        );
      }
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
          setSelectedId("");
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
            ? deleteTimeEntry
            : () => {}
        }
        selectedId={selectedId}
      />
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import TimeEntryList from "../TimeEntryList/TimeEntryList";
import TimeEntryForm from "../TimeEntryForm/TimeEntryForm";
import { TimeEntry } from "../../data/TimeEntry";
import ImportForm from "../ImportForm/ImportForm";
import NavBar from "../NavBar/NavBar";
import StatisticsList from "../StatisticsList/StatisticsList";
import CategoryList from "../CategoryList/CategoryList";

export type TabName =
  | "ADD"
  | "EDIT"
  | "DELETE"
  | "IMPORT"
  | "STATS"
  | "CATEGORIES";

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
    setSelectedId(id);
  }
  function addCategory(category: string): void {
    setCategories((categories) => [...categories, category]);
  }
  function editCategory(oldCategory: string, newCategory: string): void {
    setTimeEntries((timeEntries) =>
      timeEntries.map((timeEntry) =>
        timeEntry.category === oldCategory
          ? { ...timeEntry, category: newCategory }
          : timeEntry
      )
    );
    setCategories((categories) =>
      categories.map((category) =>
        category === oldCategory ? newCategory : category
      )
    );
  }
  function deleteCategory(category: string): void {
    setTimeEntries((timeEntries) =>
      timeEntries.map((timeEntry) =>
        timeEntry.category === category
          ? { ...timeEntry, category: categories[0] }
          : timeEntry
      )
    );
    setCategories((categories) =>
      categories.filter((categoryName) => categoryName !== category)
    );
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
      break;
    case "CATEGORIES":
      mainContent = (
        <CategoryList
          categories={categories}
          addCategory={addCategory}
          editCategory={editCategory}
          deleteCategory={deleteCategory}
        />
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
      <TimeEntryList
        timeEntries={timeEntries}
        tabName={selectedTab}
        modifyTimeEntry={
          selectedTab === "EDIT"
            ? selectTimeEntryForEditing
            : selectedTab === "DELETE"
            ? deleteTimeEntry
            : null
        }
        selectedId={selectedId}
      />
    </>
  );
}

export default App;

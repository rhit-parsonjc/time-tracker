import { useEffect, useState } from "react";
import "./App.css";
import TimeEntryList from "../TimeEntryList/TimeEntryList";
import { createTimeEntry, TimeEntry } from "../../data/TimeEntry";
import ImportForm from "../ImportForm/ImportForm";
import NavBar from "../NavBar/NavBar";
import StatisticsList from "../StatisticsList/StatisticsList";
import CategoryList from "../CategoryList/CategoryList";
import CustomForm, { FormInputProps } from "../CustomForm/CustomForm";
import { TimeEntryResult } from "../../data/LoadTypes";
import { formatTimeValue24Hour } from "../../data/TimeValue";

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
  const [categories, setCategories] = useState<string[]>(["Unknown"]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [justLoaded, setJustLoaded] = useState<boolean>(true);

  function getData() {
    const timeEntriesJSON = localStorage.getItem("timeEntries");
    if (timeEntriesJSON) {
      setTimeEntries(JSON.parse(timeEntriesJSON));
    }
    const categoriesJSON = localStorage.getItem("categories");
    if (categoriesJSON) {
      setCategories(JSON.parse(categoriesJSON));
    }
  }

  useEffect(() => {
    if (justLoaded) {
      getData();
      setJustLoaded(false);
    } else {
      saveData();
    }
  }, [timeEntries, categories]);

  function saveData() {
    const timeEntriesJSON = JSON.stringify(timeEntries);
    const categoriesJSON = JSON.stringify(categories);
    localStorage.setItem("timeEntries", timeEntriesJSON);
    localStorage.setItem("categories", categoriesJSON);
  }

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
  const timeEntryFormLines: FormInputProps[][] = [
    [
      {
        inputType: "text",
        id: "timeEntryFormDescription",
        name: "Description",
        type: "text",
        required: false,
        index: 0,
      },
    ],
    [
      {
        inputType: "category",
        id: "timeEntryFormCategory",
        required: true,
        index: 1,
      },
    ],
    [
      {
        inputType: "text",
        id: "timeEntryFormDate",
        name: "Date",
        type: "date",
        required: true,
        index: 2,
      },
    ],
    [
      {
        inputType: "text",
        id: "timeEntryStartTime",
        name: "Start Time",
        type: "time",
        required: true,
        index: 3,
      },
      {
        inputType: "text",
        id: "timeEntryEndTime",
        name: "End Time",
        type: "time",
        required: true,
        index: 4,
      },
    ],
  ];
  const initialAddFormValues = ["", categories[0], "", "00:00", "00:00"];
  switch (selectedTab) {
    case "ADD":
      mainContent = (
        <CustomForm
          initialFormValues={initialAddFormValues}
          initialFormBooleans={[]}
          onSubmit={(values: string[]) => {
            const timeEntryResult: TimeEntryResult = createTimeEntry(
              values[0], // Description
              values[1], // Category
              values[2], // Date
              values[3], // Start Time
              values[4] // End Time
            );
            if (timeEntryResult.error)
              return {
                success: false,
                errorMessage: timeEntryResult.errorMessage,
              };
            addTimeEntry(timeEntryResult.value);
            return {
              success: true,
              newValues: ["", values[1], values[2], values[4], "00:00"],
              newBooleans: [],
            };
          }}
          formInputLines={timeEntryFormLines}
          categories={categories}
          submitButtonName="Add Entry"
          submitButtonIcon="add"
          timeEntryId={null}
        />
      );
      break;
    case "EDIT":
      if (selectedId !== "") {
        const selectedTimeEntry = timeEntries.find(
          (timeEntry) => timeEntry.id === selectedId
        );
        if (!selectedTimeEntry) {
          console.log("Time entry not found");
          return null;
        }
        const formattedStartTime = formatTimeValue24Hour(
          selectedTimeEntry.startTime
        );
        let formattedEndTime = formatTimeValue24Hour(selectedTimeEntry.endTime);
        if (formattedEndTime === "24:00") formattedEndTime = "00:00";
        mainContent = (
          <CustomForm
            initialFormValues={[
              selectedTimeEntry.description,
              selectedTimeEntry.category,
              selectedTimeEntry.date,
              formattedStartTime,
              formattedEndTime,
            ]}
            initialFormBooleans={[]}
            onSubmit={(values: string[]) => {
              const timeEntryResult: TimeEntryResult = createTimeEntry(
                values[0], // Description
                values[1], // Category
                values[2], // Date
                values[3], // Start Time
                values[4] // End Time
              );
              if (timeEntryResult.error)
                return {
                  success: false,
                  errorMessage: timeEntryResult.errorMessage,
                };
              editTimeEntry(timeEntryResult.value);
              return {
                success: true,
                newValues: [...values],
                newBooleans: [],
              };
            }}
            formInputLines={timeEntryFormLines}
            categories={categories}
            submitButtonName="Edit Entry"
            submitButtonIcon="edit"
            timeEntryId={selectedTimeEntry.id}
          />
        );
      }
      break;
    case "IMPORT":
      mainContent = (
        <ImportForm
          modifyTimeEntries={(newTimeEntries) => setTimeEntries(newTimeEntries)}
          modifyCategories={(newCategories) => setCategories(newCategories)}
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
        categories={categories}
      />
      <footer>
        <p>
          This site uses local storage to keep track of data. Press this button
          to reset data:
        </p>
        <button
          id="resetAllDataButton"
          onClick={() => {
            let resetData: boolean = window.confirm(
              "Are you sure you want to reset all data?"
            );
            if (resetData) {
              localStorage.removeItem("timeEntries");
              localStorage.removeItem("categories");
              setTimeEntries([]);
              setCategories(["Unknown"]);
            }
          }}
        >
          Reset All Data
        </button>
      </footer>
    </>
  );
}

export default App;

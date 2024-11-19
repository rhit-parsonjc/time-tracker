import { TabName } from "../App/App";
import { writeTimeEntries } from "../../data/ImportExport";
import { sortTimeEntries, TimeEntry } from "../../data/TimeEntry";
import Icon from "../Icon/Icon";
import TimeEntryItem from "../TimeEntryItem/TimeEntryItem";
import styles from "./TimeEntryList.module.css";
import { wrapClickHandler } from "../../data/Utilities";
import CustomForm from "../CustomForm/CustomForm";
import { useState } from "react";

interface Props {
  timeEntries: TimeEntry[];
  tabName: TabName;
  modifyTimeEntry: ((id: string) => void) | null;
  selectedId: string;
  categories: string[];
}

function TimeEntryList(props: Props) {
  const { timeEntries, tabName, modifyTimeEntry, selectedId, categories } =
    props;
  const sortedTimeEntries: TimeEntry[] = [...timeEntries].sort(sortTimeEntries);
  const [filterValues, setFilterValues] = useState<string[]>([
    categories[0],
    "",
  ]);
  const [filterBooleans, setFilterBooleans] = useState<boolean[]>([
    false,
    false,
  ]);
  return (
    <>
      <h1 style={{ fontSize: "2em" }}>List of Entries</h1>
      <button
        id={styles.exportButton}
        onClick={() => writeTimeEntries(timeEntries)}
        onKeyDown={wrapClickHandler(() => writeTimeEntries(timeEntries))}
      >
        <Icon iconName="export" />
        <p style={{ fontSize: "1rem" }}>&nbsp;Export</p>
      </button>
      <p>Filter By:</p>
      <CustomForm
        initialFormValues={["", ""]}
        initialFormBooleans={[false, false]}
        onSubmit={(values: string[], booleans: boolean[]) => {
          setFilterValues(values);
          setFilterBooleans(booleans);
          return {
            success: true,
            newValues: [...values],
            newBooleans: [...booleans],
          };
        }}
        formInputLines={[
          [
            {
              inputType: "checkbox",
              id: "timeEntryListFilterCategoryCheckbox",
              name: "",
              index: 0,
            },
            {
              inputType: "category",
              id: "timeEntryListFilterCategory",
              required: false,
              index: 0,
            },
          ],
          [
            {
              inputType: "checkbox",
              id: "timeEntryListFilterDateCheckbox",
              name: "",
              index: 1,
            },
            {
              inputType: "text",
              id: "timeEntryListFilterDate",
              name: "Date",
              type: "date",
              required: false,
              index: 1,
            },
          ],
        ]}
        categories={categories}
        submitButtonName="Apply Filter"
        submitButtonIcon="filter"
        timeEntryId={null}
      />
      <ul id={styles.timeEntryList}>
        {sortedTimeEntries
          .filter(
            (timeEntry) =>
              (!filterBooleans[0] || filterValues[0] === timeEntry.category) &&
              (!filterBooleans[1] || filterValues[1] === timeEntry.date)
          )
          .map((timeEntry) => (
            <TimeEntryItem
              timeEntry={timeEntry}
              tabName={tabName}
              onClick={() => {
                if (modifyTimeEntry) {
                  modifyTimeEntry(timeEntry.id);
                }
              }}
              selected={selectedId === timeEntry.id}
              key={timeEntry.id}
            />
          ))}
      </ul>
    </>
  );
}

export default TimeEntryList;

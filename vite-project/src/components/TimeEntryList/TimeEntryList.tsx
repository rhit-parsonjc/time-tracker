import { TabName } from "../App/App";
import { writeTimeEntries } from "../../data/ImportExport";
import { sortTimeEntries, TimeEntry } from "../../data/TimeEntry";
import Icon from "../Icon/Icon";
import TimeEntryItem from "../TimeEntryItem/TimeEntryItem";
import styles from "./TimeEntryList.module.css";
import { wrapClickHandler } from "../../data/Utilities";

interface Props {
  timeEntries: TimeEntry[];
  tabName: TabName;
  modifyTimeEntry: ((id: string) => void) | null;
  selectedId: string;
}

function TimeEntryList(props: Props) {
  const { timeEntries, tabName, modifyTimeEntry, selectedId } = props;
  const sortedTimeEntries: TimeEntry[] = [...timeEntries].sort(sortTimeEntries);
  return (
    <>
      <button
        id={styles.exportButton}
        onClick={() => writeTimeEntries(timeEntries)}
        onKeyDown={wrapClickHandler(() => writeTimeEntries(timeEntries))}
      >
        <Icon iconName="export" />
        &nbsp;Export
      </button>
      <ul id={styles.timeentrylist}>
        {sortedTimeEntries.map((timeEntry) => (
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

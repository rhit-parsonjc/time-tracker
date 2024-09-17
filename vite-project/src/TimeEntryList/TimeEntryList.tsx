import { TabName } from "../App/App";
import { writeTimeEntries } from "../data/ImportExport";
import { sortTimeEntries, TimeEntry } from "../data/TimeEntry";
import Icon from "../Icon/Icon";
import TimeEntryItem from "../TimeEntryItem/TimeEntryItem";
import styles from "./TimeEntryList.module.css";

type Props = {
  timeEntries: TimeEntry[];
  tabName: TabName;
  modifyTimeEntry: (index: number) => void;
  selectedIndex: number;
};

function TimeEntryList(props: Props) {
  const { timeEntries, tabName, modifyTimeEntry, selectedIndex } = props;
  const sortedTimeEntries: TimeEntry[] = [...timeEntries].sort(sortTimeEntries);
  return (
    <>
      <button
        id={styles.exportButton}
        onClick={() => writeTimeEntries(timeEntries)}
      >
        <Icon iconName="export" />
        &nbsp;Export
      </button>
      <ul id={styles.timeentrylist}>
        {sortedTimeEntries.map((timeEntry, index) => (
          <TimeEntryItem
            timeEntry={timeEntry}
            tabName={tabName}
            onClick={() => modifyTimeEntry(index)}
            selected={selectedIndex === index}
          />
        ))}
      </ul>
    </>
  );
}

export default TimeEntryList;

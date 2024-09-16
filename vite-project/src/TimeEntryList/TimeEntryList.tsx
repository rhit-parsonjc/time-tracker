import { writeTimeEntries } from "../data/ImportExport";
import { sortTimeEntries, TimeEntry } from "../data/TimeEntry";
import Icon from "../Icon/Icon";
import TimeEntryItem from "../TimeEntryItem/TimeEntryItem";
import styles from "./TimeEntryList.module.css";

type Props = {
  timeEntries: TimeEntry[];
  deletionActive: boolean;
  deleteTimeEntries: (index: number) => void;
};

function TimeEntryList(props: Props) {
  const { timeEntries, deletionActive, deleteTimeEntries } = props;
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
            deletionActive={deletionActive}
            onDelete={() => deleteTimeEntries(index)}
          />
        ))}
      </ul>
    </>
  );
}

export default TimeEntryList;

import { writeTimeEntries } from "../data/ImportExport";
import { TimeEntry } from "../data/TimeEntry";
import { determineDuration } from "../data/TimeValue";
import TimeEntryItem from "../TimeEntryItem/TimeEntryItem";
import styles from "./TimeEntryList.module.css";

type Props = {
  timeEntries: TimeEntry[];
  deletionActive: boolean;
  deleteTimeEntries: (index: number) => void;
};

function TimeEntryList(props: Props) {
  const { timeEntries, deletionActive, deleteTimeEntries } = props;
  const sortedTimeEntries: TimeEntry[] = timeEntries.sort((a, b) => {
    if (a.date > b.date) return 1;
    else if (a.date < b.date) return -1;
    else {
      const timeInterval = determineDuration(b.startTime, a.startTime);
      if (timeInterval !== 0) return timeInterval;
      else return determineDuration(b.endTime, a.endTime);
    }
  });
  return (
    <>
      <button onClick={() => writeTimeEntries(timeEntries)}>Export</button>
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

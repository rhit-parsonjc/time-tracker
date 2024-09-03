import { TimeEntry } from "../data/TimeEntry";
import TimeEntryItem from "../TimeEntryItem/TimeEntryItem";
import styles from "./TimeEntryList.module.css";

type Props = {
  timeEntries: TimeEntry[];
};

function TimeEntryList(props: Props) {
  const { timeEntries } = props;
  return (
    <ul id={styles.timeentrylist}>
      {timeEntries.map((timeEntry) => (
        <TimeEntryItem timeEntry={timeEntry} />
      ))}
    </ul>
  );
}

export default TimeEntryList;

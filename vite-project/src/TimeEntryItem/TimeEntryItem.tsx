import { TimeEntry } from "../data/TimeEntry";
import { determineDuration, formatTimeValue } from "../data/TimeValue";
import styles from "./TimeEntryItem.module.css";

type Props = {
  timeEntry: TimeEntry;
};

function TimeEntryItem(props: Props) {
  const { timeEntry } = props;
  return (
    <li>
      <article id={styles.timeentry}>
        <h2 id={styles.category}>{timeEntry.category} </h2>
        <p id={styles.description}>{timeEntry.description}</p>
        <p>
          {timeEntry.date} {formatTimeValue(timeEntry.startTime, false)}-
          {formatTimeValue(timeEntry.endTime, true)}
        </p>
      </article>
    </li>
  );
}

export default TimeEntryItem;

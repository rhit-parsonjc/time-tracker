import { TimeEntry } from "../data/TimeEntry";
import {
  determineDuration,
  formatDuration,
  formatTimeValue,
} from "../data/TimeValue";
import Icon from "../Icon/Icon";
import styles from "./TimeEntryItem.module.css";

type Props = {
  timeEntry: TimeEntry;
  deletionActive: boolean;
  onDelete: () => void;
};

function TimeEntryItem(props: Props) {
  const { timeEntry, deletionActive, onDelete } = props;
  return (
    <li>
      <article
        id={styles.timeentry}
        className={deletionActive ? styles.deletable : styles.notDeletable}
        onClick={deletionActive ? onDelete : () => {}}
      >
        {deletionActive && (
          <div id={styles.deleteIcon}>
            <Icon iconName="delete" />
          </div>
        )}
        <div id={styles.timeentryinfo}>
          <div id={styles.maincontent}>
            <h2 id={styles.category}>{timeEntry.category} </h2>
            <p id={styles.description}>{timeEntry.description}</p>
            <p>
              {timeEntry.date} {formatTimeValue(timeEntry.startTime)}-
              {formatTimeValue(timeEntry.endTime)}
            </p>
          </div>
          <div id={styles.sidecontent}>
            <p>
              {formatDuration(
                determineDuration(timeEntry.startTime, timeEntry.endTime)
              )}
            </p>
          </div>
        </div>
      </article>
    </li>
  );
}

export default TimeEntryItem;

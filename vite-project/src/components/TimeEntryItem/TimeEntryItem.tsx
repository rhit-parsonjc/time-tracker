import { TabName } from "../App/App";
import { TimeEntry } from "../../data/TimeEntry";
import {
  determineDuration,
  formatDuration,
  formatTimeValue,
} from "../../data/TimeValue";
import Icon from "../Icon/Icon";
import styles from "./TimeEntryItem.module.css";

interface Props {
  timeEntry: TimeEntry;
  tabName: TabName;
  onClick: () => void;
  selected: boolean;
}

function TimeEntryItem(props: Props) {
  const { timeEntry, tabName, onClick, selected } = props;
  return (
    <li>
      <article
        id={styles.timeEntry}
        className={
          selected
            ? styles.selected
            : tabName === "DELETE"
            ? styles.deletable
            : tabName === "EDIT"
            ? styles.editable
            : styles.normal
        }
        onClick={onClick}
      >
        {tabName === "DELETE" && (
          <div className={styles.centerIcon}>
            <Icon iconName="delete" />
          </div>
        )}
        {tabName === "EDIT" && (
          <div className={styles.centerIcon}>
            <Icon iconName="edit" />
          </div>
        )}
        <div id={styles.timeEntryInfo}>
          <div id={styles.mainContent}>
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

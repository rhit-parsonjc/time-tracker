import { TabName } from "../App/App";
import { TimeEntry } from "../../data/TimeEntry";
import {
  determineDuration,
  formatDuration,
  formatTimeValue,
} from "../../data/TimeValue";
import Icon from "../Icon/Icon";
import styles from "./TimeEntryItem.module.css";
import { wrapClickHandler } from "../../data/Utilities";

interface Props {
  timeEntry: TimeEntry;
  tabName: TabName;
  onClick: () => void;
  selected: boolean;
}

function TimeEntryItem(props: Props) {
  const { timeEntry, tabName, onClick, selected } = props;
  const content = (
    <>
      {tabName === "DELETE" && (
        <div className={styles.centerIcon}>
          <Icon iconName="delete" />
          <p>Delete Entry</p>
        </div>
      )}
      {tabName === "EDIT" && (
        <div className={styles.centerIcon}>
          <Icon iconName="edit" />
          <p>Edit Entry</p>
        </div>
      )}
      <div id={styles.timeEntryInfo}>
        <div id={styles.mainContent}>
          <h2
            id={styles.category}
            style={{ fontSize: "1.5rem", textAlign: "left" }}
          >
            {timeEntry.category}
          </h2>
          <p
            id={styles.description}
            style={{ fontSize: "0.75rem", textAlign: "left" }}
          >
            {timeEntry.description}
          </p>
          <p style={{ fontSize: "1rem" }}>
            {timeEntry.date} {formatTimeValue(timeEntry.startTime)}-
            {formatTimeValue(timeEntry.endTime)}
          </p>
        </div>
        <div id={styles.sidecontent}>
          <p style={{ fontSize: "1.25rem" }}>
            {formatDuration(
              determineDuration(timeEntry.startTime, timeEntry.endTime)
            )}
          </p>
        </div>
      </div>
    </>
  );
  return (
    <li>
      {tabName === "EDIT" || tabName === "DELETE" ? (
        <button
          id={styles.timeEntry}
          className={
            selected
              ? styles.selected
              : tabName === "DELETE"
              ? styles.deletable
              : styles.editable
          }
          onClick={onClick}
          tabIndex={0}
          onKeyDown={wrapClickHandler(onClick)}
        >
          {content}
        </button>
      ) : (
        <article
          id={styles.timeEntry}
          className={selected ? styles.selected : styles.normal}
          tabIndex={0}
        >
          {content}
        </article>
      )}
    </li>
  );
}

export default TimeEntryItem;

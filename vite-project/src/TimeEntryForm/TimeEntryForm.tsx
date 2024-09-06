import { useState } from "react";
import { TimeEntry, createTimeEntry } from "../data/TimeEntry";
import styles from "./TimeEntryForm.module.css";
import { TimeEntryResult } from "../data/LoadTypes";
import ErrorMessage from "../ErrorMessage/ErrorMesage";

type Props = {
  addTimeEntry: (timeEntry: TimeEntry) => void;
};

function TimeEntryForm(props: Props) {
  const { addTimeEntry } = props;

  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("UNKNOWN");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log({ description, category, date, startTime, endTime });
    const newTimeEntry: TimeEntryResult = createTimeEntry(
      description,
      category,
      date,
      startTime,
      endTime
    );
    if (newTimeEntry.error) setErrorMessage(newTimeEntry.errorMessage);
    else {
      addTimeEntry(newTimeEntry.value);
      setErrorMessage("");
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.formline}>
          <label htmlFor="timeentryformdescription">Description</label>
          <input
            type="text"
            id="timeentryformdescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div className={styles.formline}>
          <label htmlFor="timeentryformcategory">Category</label>
          <select
            name="category"
            id="timeentryformcategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="UNKNOWN">Unknown</option>
            <option value="WORK">Work</option>
            <option value="FUN">Fun</option>
          </select>
        </div>
        <div className={styles.formline}>
          <label htmlFor="timeentryformdate">Date</label>
          <input
            type="date"
            id="timeentryformdate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.formline}>
          <label htmlFor="timeentryformstarttime">Start Time</label>
          <input
            type="time"
            id="timeentryformstarttime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <label htmlFor="timeentryformendtime">End Time</label>
          <input
            type="time"
            id="timeentryformendtime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="Add Entry" />
      </form>
      <ErrorMessage message={errorMessage} />
    </>
  );
}

export default TimeEntryForm;

import { useEffect, useState } from "react";
import { TimeEntry, createTimeEntry } from "../../data/TimeEntry";
import styles from "./TimeEntryForm.module.css";
import { TimeEntryResult } from "../../data/LoadTypes";
import ErrorMessage from "../ErrorMessage/ErrorMesage";
import { formatTimeValue24Hour } from "../../data/TimeValue";

interface Props {
  createNewEntry: boolean;
  handleButtonPress: ((timeEntry: TimeEntry) => void) | null;
  categories: string[];
  startingTimeEntry?: TimeEntry;
}

function TimeEntryForm(props: Props) {
  const { createNewEntry, handleButtonPress, categories, startingTimeEntry } =
    props;
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>(categories[0]);
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("00:00");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (startingTimeEntry) {
      setDescription(startingTimeEntry.description);
      setCategory(startingTimeEntry.category);
      setDate(startingTimeEntry.date);
      setStartTime(formatTimeValue24Hour(startingTimeEntry.startTime));
      let formattedEndTime: string = formatTimeValue24Hour(
        startingTimeEntry.endTime
      );
      if (formattedEndTime === "24:00") formattedEndTime = "00:00";
      setEndTime(formattedEndTime);
    } else {
      setDescription("");
      setCategory(categories[0]);
      setDate("");
      setStartTime("00:00");
      setEndTime("00:00");
    }
  }, [startingTimeEntry]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const timeEntryResult: TimeEntryResult = createTimeEntry(
      description,
      category,
      date,
      startTime,
      endTime
    );
    if (timeEntryResult.error) setErrorMessage(timeEntryResult.errorMessage);
    else {
      if (handleButtonPress) {
        handleButtonPress(timeEntryResult.value);
      }
      if (createNewEntry) {
        setDescription("");
        setStartTime(endTime);
        setEndTime("00:00");
        setErrorMessage("");
      }
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.formline} tabIndex={0}>
          <label htmlFor="timeentryformdescription">Description</label>
          <input
            type="text"
            id="timeentryformdescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div className={styles.formline} tabIndex={0}>
          <label htmlFor="timeentryformcategory">Category</label>
          <select
            name="category"
            id="timeentryformcategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formline} tabIndex={0}>
          <label htmlFor="timeentryformdate">Date</label>
          <input
            type="date"
            id="timeentryformdate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.formline} tabIndex={0}>
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
        <input
          type="submit"
          value={createNewEntry ? "Add Entry" : "Edit Entry"}
        />
      </form>
      <ErrorMessage message={errorMessage} />
    </>
  );
}

export default TimeEntryForm;

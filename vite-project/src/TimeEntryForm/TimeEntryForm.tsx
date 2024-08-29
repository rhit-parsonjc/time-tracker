import { useState } from "react";
import TimeEntry from "../data/TimeEntry";
import "./TimeEntryForm.css";

type Props = {
  addTimeEntry: (timeEntry: TimeEntry) => void;
};

function TimeEntryForm(props: Props) {
  const { addTimeEntry } = props;

  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  function handleSubmit(e: any) {
    e.preventDefault();
    const newTimeEntry = { description, category, date, startTime, endTime };
    addTimeEntry(newTimeEntry);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div id="descriptionEntry">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      </div>
      <div id="category">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="work">Work</option>
          <option value="fun">Fun</option>
        </select>
      </div>
      <div id="dateEntry">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div id="timeEntries">
        <label htmlFor="starttime">Start Time</label>
        <input
          type="time"
          id="starttime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label htmlFor="endtime">End Time</label>
        <input
          type="time"
          id="endtime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <input type="submit" value="Add Entry" />
    </form>
  );
}

export default TimeEntryForm;

import { useState } from "react";
import "./App.css";
import TimeEntryList from "./TimeEntryList/TimeEntryList";

type timeEntry = {
  description: string;
  category: string;
  time: Date;
};

function App() {
  function logTime() {
    const newEntry = {
      description,
      category,
      time: new Date(),
    };
    setTimeEntries((prevTimeEntries) => [...prevTimeEntries, newEntry]);
  }
  const [timeEntries, setTimeEntries] = useState<timeEntry[]>([]);
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([
    "Work",
    "Sleep",
    "Food",
    "Fun",
  ]);
  const [category, setCategory] = useState<string>("");
  return (
    <>
      <h1>Time Tracker</h1>
      <p>Press this button to log the time.</p>
      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={logTime}>Time</button>
      <label htmlFor="category">Category</label>
      <select
        name="category"
        id="category"
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
      <TimeEntryList timeEntries={timeEntries}></TimeEntryList>
    </>
  );
}

export default App;

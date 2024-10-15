import { sortTimeEntries, TimeEntry } from "../../data/TimeEntry";
import { determineDuration, formatDuration } from "../../data/TimeValue";
import styles from "./StatisticsList.module.css";
import { useState } from "react";

interface Props {
  categories: string[];
  timeEntries: TimeEntry[];
}

interface Stats {
  date: string;
  timesPerCategory: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

function StatisticsList(props: Props) {
  const { categories, timeEntries } = props;

  const sortedTimeEntries: TimeEntry[] = [...timeEntries].sort(sortTimeEntries);
  const [selectedRow, setSelectedRow] = useState<number>(-1);

  let lastDate = "";
  const statsList: Stats[] = [];
  for (const sortedTimeEntry of sortedTimeEntries) {
    const { date, category, startTime, endTime } = sortedTimeEntry;
    const duration = determineDuration(startTime, endTime);
    if (date === lastDate) {
      const lastTimeEntry: Stats = statsList[statsList.length - 1];
      lastTimeEntry.timesPerCategory[category] += duration;
    } else {
      const timesPerCategory: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
      for (const categoryName of categories) timesPerCategory[categoryName] = 0;
      timesPerCategory[category] += duration;
      lastDate = date;
      statsList.push({ date, timesPerCategory });
    }
  }
  const timesPerCategory =
    selectedRow === -1 ? null : statsList[selectedRow].timesPerCategory;
  return (
    <>
      <table id={styles.statsTable}>
        <thead id={styles.statsTableHeader} tabIndex={0}>
          <tr>
            <th className={styles.statsTableHeaderEntry}>Date</th>
            {[...categories].map((category) => (
              <th key={category} className={styles.statsTableHeaderEntry}>
                {category}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {statsList.map((statsEntry, index) => (
            <tr
              key={statsEntry.date}
              className={styles.statsTableRow}
              onClick={() => setSelectedRow(index)}
              style={
                selectedRow === index
                  ? { backgroundColor: "hsl(39, 100%, 70%)" }
                  : {}
              }
              tabIndex={0}
            >
              <td className={styles.statsTableDataEntry}>{statsEntry.date}</td>
              {categories.map((category) => (
                <td key={category} className={styles.statsTableDataEntry}>
                  {formatDuration(statsEntry.timesPerCategory[category])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {timesPerCategory && (
        <article id={styles.barGraph}>
          {categories.map((category) => {
            const barStyle = {
              width: (timesPerCategory[category] / (24 * 60)) * 100 + "%",
            };
            return (
              <div
                style={barStyle}
                className={styles.barEntry}
                key={category}
                tabIndex={0}
              >
                <p className={styles.barEntryLabel}>{category}</p>
              </div>
            );
          })}
        </article>
      )}
    </>
  );
}

export default StatisticsList;

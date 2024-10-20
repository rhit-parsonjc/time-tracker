import { TimeEntry } from "../../data/TimeEntry";
import { formatDuration } from "../../data/TimeValue";
import { computeStatistics, wrapClickHandler } from "../../data/Utilities";
import styles from "./StatisticsList.module.css";
import { useState } from "react";

interface Props {
  categories: string[];
  timeEntries: TimeEntry[];
}

function StatisticsList(props: Props) {
  const { categories, timeEntries } = props;
  const [selectedRow, setSelectedRow] = useState<number>(-1);
  const statsList = computeStatistics(timeEntries, categories);
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
              onKeyDown={wrapClickHandler(() => setSelectedRow(index))}
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
          {categories
            .filter((category) => timesPerCategory[category] > 0)
            .map((category) => {
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

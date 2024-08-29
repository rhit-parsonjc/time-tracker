import TimeEntry from "../data/TimeEntry";
import TimeEntryItem from "../TimeEntryItem/TimeEntryItem";

type Props = {
  timeEntries: TimeEntry[];
};

function TimeEntryList(props: Props) {
  const { timeEntries } = props;
  return (
    <ul>
      {timeEntries.map((timeEntry) => (
        <TimeEntryItem timeEntry={timeEntry} />
      ))}
    </ul>
  );
}

export default TimeEntryList;

import TimeEntry from "../data/TimeEntry";

type Props = {
  timeEntry: TimeEntry;
};

function TimeEntryItem(props: Props) {
  const { timeEntry } = props;
  return (
    <li>
      {timeEntry.category} {timeEntry.description}{" "}
      {timeEntry.time.toISOString()}
    </li>
  );
}

export default TimeEntryItem;

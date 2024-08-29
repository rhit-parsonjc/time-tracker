import TimeEntry from "../data/TimeEntry";

type Props = {
  timeEntry: TimeEntry;
};

function TimeEntryItem(props: Props) {
  const { timeEntry } = props;
  return (
    <li>
      {timeEntry.category} {timeEntry.description} {timeEntry.date}{" "}
      {timeEntry.startTime} {timeEntry.endTime}
    </li>
  );
}

export default TimeEntryItem;

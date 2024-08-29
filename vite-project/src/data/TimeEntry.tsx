type DateValue = {
  month: number;
  day: number;
  year: number;
};

type TimeValue = {
  hours: number;
  minutes: number;
  seconds: number;
};

type TimeEntry = {
  description: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
};

export default TimeEntry;

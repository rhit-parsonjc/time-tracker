import { TimeEntry } from "./TimeEntry";
import { TimeValue } from "./TimeValue";

export type ErrorResult = {
  error: true;
  errorMessage: string;
};

export type TimeValueResult =
  | {
      error: false;
      value: TimeValue;
    }
  | ErrorResult;

export type TimeEntryListResult =
  | {
      error: false;
      value: TimeEntry[];
    }
  | ErrorResult;

export type TimeEntryResult =
  | {
      error: false;
      value: TimeEntry;
    }
  | ErrorResult;

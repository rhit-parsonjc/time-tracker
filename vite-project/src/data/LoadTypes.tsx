import { TimeEntry } from "./TimeEntry";
import { TimeValue } from "./TimeValue";

interface ErrorResult {
  error: true;
  errorMessage: string;
}

export type TimeValueResult =
  | {
      error: false;
      value: TimeValue;
    }
  | ErrorResult;

export type TimeEntryListAndCategoriesResult =
  | {
      error: false;
      value: {
        timeEntries: TimeEntry[];
        categories: string[];
      };
    }
  | ErrorResult;

export type TimeEntryResult =
  | {
      error: false;
      value: TimeEntry;
    }
  | ErrorResult;

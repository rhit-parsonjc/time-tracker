import { TimeEntry } from "./TimeEntry";
import { computeStatistics } from "./Utilities";

/*
export interface TimeEntry {
  id: string;
  description: string;
  category: string;
  date: string;
  startTime: TimeValue;
  endTime: TimeValue;
}
 */

describe("computeStatistics tests", () => {
  it("works for a single entry", () => {
    const timeEntries: TimeEntry[] = [
      {
        id: "1",
        description: "",
        category: "A",
        date: "2024-10-15",
        startTime: { hours: 0, minutes: 0 },
        endTime: { hours: 7, minutes: 39 },
      },
    ];
    const stats = computeStatistics(timeEntries, ["A", "B", "C", "D"]);
    expect(stats).toEqual([
      { date: "2024-10-15", timesPerCategory: { A: 459, B: 0, C: 0, D: 0 } },
    ]);
  });
  it("works for multiple consecutive entries", () => {
    const timeEntries: TimeEntry[] = [
      {
        id: "1",
        description: "",
        category: "A",
        date: "2023-08-29",
        startTime: { hours: 0, minutes: 0 },
        endTime: { hours: 4, minutes: 7 },
      },
      {
        id: "2",
        description: "",
        category: "D",
        date: "2023-08-29",
        startTime: { hours: 4, minutes: 7 },
        endTime: { hours: 11, minutes: 24 },
      },
      {
        id: "3",
        description: "",
        category: "B",
        date: "2023-08-29",
        startTime: { hours: 11, minutes: 24 },
        endTime: { hours: 15, minutes: 50 },
      },
    ];
    const stats = computeStatistics(timeEntries, ["A", "B", "C", "D"]);
    expect(stats).toEqual([
      {
        date: "2023-08-29",
        timesPerCategory: { A: 247, B: 266, C: 0, D: 437 },
      },
    ]);
  });
  it("works for multiple separated entries", () => {
    const timeEntries: TimeEntry[] = [
      {
        id: "1",
        description: "",
        category: "C",
        date: "2019-07-14",
        startTime: { hours: 9, minutes: 10 },
        endTime: { hours: 10, minutes: 28 },
      },
      {
        id: "2",
        description: "",
        category: "A",
        date: "2019-07-14",
        startTime: { hours: 2, minutes: 46 },
        endTime: { hours: 4, minutes: 0 },
      },
      {
        id: "3",
        description: "",
        category: "D",
        date: "2019-07-14",
        startTime: { hours: 12, minutes: 34 },
        endTime: { hours: 18, minutes: 29 },
      },
    ];
    const stats = computeStatistics(timeEntries, ["A", "B", "C", "D"]);
    expect(stats).toEqual([
      {
        date: "2019-07-14",
        timesPerCategory: { A: 74, B: 0, C: 78, D: 355 },
      },
    ]);
  });
});

import {
  formatDuration,
  determineDuration,
  formatTimeValue,
} from "./TimeValue";

describe("formatDuration tests", () => {
  it("displays just hours if there are only hours", () => {
    expect(formatDuration(180)).toBe("3h");
  });
  it("displays just minutes if not a full hour", () => {
    expect(formatDuration(40)).toBe("40m");
  });
  it("displays hours and minutes when there are both", () => {
    expect(formatDuration(80)).toBe("1h 20m");
  });
});

describe("determineDuration tests", () => {
  it("displays the correct value for a typical interval", () => {
    expect(
      determineDuration({ hours: 9, minutes: 10 }, { hours: 10, minutes: 35 })
    ).toBe(85);
  });
});

describe("formatTimeValue tests", () => {
  it("displays 3:34 AM correctly", () => {
    expect(formatTimeValue({ hours: 3, minutes: 34 })).toBe("3:34 AM");
  });
  it("displays 5:07 AM correctly", () => {
    expect(formatTimeValue({ hours: 5, minutes: 7 })).toBe("5:07 AM");
  });
  it("displays 6:23 PM correctly", () => {
    expect(formatTimeValue({ hours: 18, minutes: 23 })).toBe("6:23 PM");
  });
  it("displays 10:03 PM correctly", () => {
    expect(formatTimeValue({ hours: 22, minutes: 3 })).toBe("10:03 PM");
  });
  it("displays 12:08 AM correctly", () => {
    expect(formatTimeValue({ hours: 0, minutes: 8 })).toBe("12:08 AM");
  });
  it("displays 12:52 PM correctly", () => {
    expect(formatTimeValue({ hours: 12, minutes: 52 })).toBe("12:52 PM");
  });
  it("displays START correctly", () => {
    expect(formatTimeValue({ hours: 0, minutes: 0 })).toBe("START");
  });
  it("displays END correctly", () => {
    expect(formatTimeValue({ hours: 24, minutes: 0 })).toBe("END");
  });
});

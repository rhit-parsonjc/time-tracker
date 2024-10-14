import { formatDuration } from "./TimeValue";

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

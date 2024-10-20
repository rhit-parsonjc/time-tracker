import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import TimeEntryItem from "./TimeEntryItem";
import { TabName } from "../App/App";
import { TimeEntry } from "../../data/TimeEntry";

interface Component {
  getCalledOnClick: () => boolean;
  user: UserEvent;
}

function renderComponent(
  timeEntry: TimeEntry,
  tabName: TabName,
  selected: boolean
): Component {
  let calledOnClick = false;
  function getCalledOnClick() {
    return calledOnClick;
  }
  function onClick() {
    calledOnClick = true;
  }
  render(
    <TimeEntryItem
      timeEntry={timeEntry}
      tabName={tabName}
      onClick={onClick}
      selected={selected}
    />
  );
  return {
    getCalledOnClick,
    user: userEvent.setup(),
  };
}

describe("TimeEntryItem tests", () => {
  it("displays all of the time entry parts", () => {
    renderComponent(
      {
        id: "",
        description: "Sample-related work",
        category: "Sample",
        date: "2024-10-19",
        startTime: { hours: 3, minutes: 15 },
        endTime: { hours: 7, minutes: 45 },
      },
      "STATS",
      true
    );
    screen.getByText("Sample-related work");
    screen.getByText("Sample");
    screen.getByText(/2024-10-19/);
    screen.getByText(/3:15 AM-7:45 AM/);
    screen.getByText("4h 30m");
  });
  it("calls onClick when the time entry is pressed on Edit tab", async () => {
    const { getCalledOnClick, user } = renderComponent(
      {
        id: "",
        description: "Worked on E",
        category: "E",
        date: "2024-09-22",
        startTime: { hours: 8, minutes: 40 },
        endTime: { hours: 15, minutes: 7 },
      },
      "EDIT",
      true
    );
    screen.getByText("Edit Entry");
    const timeEntry = screen.getByRole("button");
    expect(getCalledOnClick()).toBe(false);
    await user.click(timeEntry);
    expect(getCalledOnClick()).toBe(true);
  });
  it("calls onClick when the time entry is pressed on Delete tab", async () => {
    const { getCalledOnClick, user } = renderComponent(
      {
        id: "",
        description: "Worked on F",
        category: "F",
        date: "2023-08-09",
        startTime: { hours: 3, minutes: 9 },
        endTime: { hours: 17, minutes: 35 },
      },
      "DELETE",
      true
    );
    screen.getByText("Delete Entry");
    const timeEntry = screen.getByRole("button");
    expect(getCalledOnClick()).toBe(false);
    await user.click(timeEntry);
    expect(getCalledOnClick()).toBe(true);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import TimeEntryForm from "./TimeEntryForm";
import { TimeEntry } from "../../data/TimeEntry";

type Inputs = {
  descriptionInput: HTMLElement;
  categoryInput: HTMLElement;
  dateInput: HTMLElement;
  startTimeInput: HTMLElement;
  endTimeInput: HTMLElement;
  submitButton: HTMLElement;
  user: UserEvent;
};

function renderComponent(
  handleButtonPress: (timeEntry: TimeEntry) => void
): Inputs {
  render(
    <TimeEntryForm
      createNewEntry={true}
      handleButtonPress={handleButtonPress}
      categories={["A", "B", "C"]}
    />
  );
  return {
    descriptionInput: screen.getByLabelText(/description/i),
    categoryInput: screen.getByLabelText(/category/i),
    dateInput: screen.getByLabelText(/date/i),
    startTimeInput: screen.getByLabelText(/start time/i),
    endTimeInput: screen.getByLabelText(/end time/i),
    submitButton: screen.getByRole("button", { name: "Add Entry" }),
    user: userEvent.setup(),
  };
}

describe("Time Entry Form", () => {
  it("renders onto the screen with the proper inputs", () => {
    renderComponent(() => {});
  });

  it("can enter a valid time entry", async () => {
    let lastTimeEntry: TimeEntry | null = null;
    const {
      descriptionInput,
      categoryInput,
      dateInput,
      startTimeInput,
      endTimeInput,
      submitButton,
      user,
    } = renderComponent((timeEntry) => {
      console.log("Called");
      lastTimeEntry = { ...timeEntry, id: undefined };
    });
    await user.type(descriptionInput, "Working on C");
    screen.getByDisplayValue("Working on C");
    await user.selectOptions(categoryInput, "C");
    screen.getByDisplayValue("C");
    await user.type(dateInput, "2024-10-05");
    screen.getByDisplayValue("2024-10-05");
    await user.type(startTimeInput, "01:00", {
      initialSelectionStart: 0,
      initialSelectionEnd: startTimeInput?.value.length,
    });
    screen.getByDisplayValue("01:00");
    await user.type(endTimeInput, "02:00", {
      initialSelectionStart: 0,
      initialSelectionEnd: endTimeInput?.value.length,
    });
    screen.getByDisplayValue("02:00");
    await user.click(submitButton);
    expect(lastTimeEntry).toEqual({
      description: "Working on C",
      category: "C",
      date: "2024-10-05",
      startTime: { hours: 1, minutes: 0 },
      endTime: { hours: 2, minutes: 0 },
    });
  });
});

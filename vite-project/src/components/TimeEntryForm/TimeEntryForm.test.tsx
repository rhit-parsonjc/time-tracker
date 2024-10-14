import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import TimeEntryForm from "./TimeEntryForm";
import { TimeEntry } from "../../data/TimeEntry";

type Inputs = {
  descriptionInput: HTMLInputElement;
  categoryInput: HTMLInputElement;
  dateInput: HTMLInputElement;
  startTimeInput: HTMLInputElement;
  endTimeInput: HTMLInputElement;
  submitButton: HTMLElement;
  user: UserEvent;
};

type InputTexts = {
  descriptionText: string;
  categoryText: string;
  dateText: string;
  startTimeText: string;
  endTimeText: string;
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

async function enterInformationIntoForm(
  inputs: Inputs,
  inputTexts: InputTexts
) {
  const {
    descriptionInput,
    categoryInput,
    dateInput,
    startTimeInput,
    endTimeInput,
    submitButton,
    user,
  } = inputs;
  const {
    descriptionText,
    categoryText,
    dateText,
    startTimeText,
    endTimeText,
  } = inputTexts;
  if (descriptionText) await user.type(descriptionInput, descriptionText);
  if (categoryText) await user.selectOptions(categoryInput, categoryText);
  if (dateText) await user.type(dateInput, dateText);
  if (startTimeText)
    await user.type(startTimeInput, startTimeText, {
      initialSelectionStart: 0,
      initialSelectionEnd: startTimeInput?.value.length,
    });
  if (endTimeText)
    await user.type(endTimeInput, endTimeText, {
      initialSelectionStart: 0,
      initialSelectionEnd: endTimeInput?.value.length,
    });
  await user.click(submitButton);
}

describe("Time Entry Form", () => {
  it("renders onto the screen with the proper inputs", () => {
    renderComponent(() => {});
  });

  it("can enter a valid time entry", async () => {
    let lastTimeEntry: TimeEntry | null = null;
    const inputs = renderComponent((timeEntry) => {
      lastTimeEntry = { ...timeEntry, id: "" };
    });
    await enterInformationIntoForm(inputs, {
      descriptionText: "Working on C",
      categoryText: "C",
      dateText: "2024-10-05",
      startTimeText: "01:00",
      endTimeText: "02:00",
    });
    expect(lastTimeEntry).toEqual({
      id: "",
      description: "Working on C",
      category: "C",
      date: "2024-10-05",
      startTime: { hours: 1, minutes: 0 },
      endTime: { hours: 2, minutes: 0 },
    });
  });

  it("can enter a time entry without a description", async () => {
    let lastTimeEntry: TimeEntry | null = null;
    const inputs = renderComponent((timeEntry) => {
      lastTimeEntry = { ...timeEntry, id: "" };
    });
    await enterInformationIntoForm(inputs, {
      descriptionText: "",
      categoryText: "B",
      dateText: "2024-10-14",
      startTimeText: "05:30",
      endTimeText: "05:45",
    });
    expect(lastTimeEntry).toEqual({
      id: "",
      description: "",
      category: "B",
      date: "2024-10-14",
      startTime: { hours: 5, minutes: 30 },
      endTime: { hours: 5, minutes: 45 },
    });
  });

  it("will display an error if the start time is after the end time", async () => {
    let lastTimeEntry: TimeEntry | null = null;
    const inputs = renderComponent((timeEntry) => {
      lastTimeEntry = { ...timeEntry, id: "" };
    });
    await enterInformationIntoForm(inputs, {
      descriptionText: "Working on A",
      categoryText: "A",
      dateText: "2024-01-01",
      startTimeText: "14:15",
      endTimeText: "02:30",
    });
    expect(lastTimeEntry).toBeNull();
    screen.getByText(/end time is not after start time/i);
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import TextFormInput from "./TextFormInput";

interface Inputs {
  getText: () => string;
  textInput: HTMLInputElement;
  user: UserEvent;
}

function renderComponent(
  initialText: string,
  name: string,
  type: React.HTMLInputTypeAttribute
): Inputs {
  let text = initialText;
  function setText(newText: string) {
    text = newText;
  }
  function getText() {
    return text;
  }
  render(
    <TextFormInput
      id="textFormInput"
      name={name}
      type={type}
      initialValue={text}
      required={true}
      onChange={setText}
    />
  );
  return {
    getText,
    textInput: screen.getByLabelText(name),
    user: userEvent.setup(),
  };
}

describe("TextFormInput tests", () => {
  it("displays initial text", () => {
    renderComponent("Hello World", "Sample", "text");
    screen.getByDisplayValue("Hello World");
  });
  it("allows the text to be edited", async () => {
    const { getText, textInput, user } = renderComponent(
      "Hello World",
      "Sample",
      "text"
    );
    await user.clear(textInput);
    await user.type(textInput, "Testing...");
    screen.getByDisplayValue("Testing...");
    expect(getText()).toBe("Testing...");
  });
});

import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMesage";

describe("ErrorMessage test", () => {
  it("displays the error message provided", () => {
    render(<ErrorMessage message="Something went wrong" />);
    screen.getByText("Something went wrong");
  });
});

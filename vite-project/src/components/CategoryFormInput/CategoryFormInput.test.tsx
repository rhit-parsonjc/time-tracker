import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import CategoryFormInput from "./CategoryFormInput";

interface Inputs {
  getCategory: () => string;
  categoryInput: HTMLInputElement;
  user: UserEvent;
}

function renderComponent(categories: string[], index: number): Inputs {
  const initialCategory = categories[index];
  let category = initialCategory;
  function setCategory(newCategory: string) {
    category = newCategory;
  }
  function getCategory() {
    return category;
  }
  render(
    <CategoryFormInput
      id="categoryFormInput"
      categories={categories}
      initialCategory={initialCategory}
      required={true}
      onChange={setCategory}
    />
  );
  return {
    getCategory,
    categoryInput: screen.getByLabelText(/category/i),
    user: userEvent.setup(),
  };
}

describe("CategoryFormInput tests", () => {
  it("displays initial category", () => {
    renderComponent(["Zero", "One", "Two", "Three", "Four", "Five"], 0);
    screen.getByDisplayValue("Zero");
  });
  it("allows a different category to be selected", async () => {
    const { getCategory, categoryInput, user } = renderComponent(
      ["Zero", "One", "Two", "Three", "Four", "Five"],
      0
    );
    await user.selectOptions(categoryInput, ["Three"]);
    screen.getByDisplayValue("Three");
    expect(getCategory()).toBe("Three");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import CategoryItem from "./CategoryItem";

interface Functions {
  editFn: () => void;
  deleteFn: () => void;
  getFn: () => string;
}

interface Components {
  categoryText: HTMLElement;
  editIcon: HTMLElement;
  deleteIcon: HTMLElement | null;
  user: UserEvent;
}

function generateEditAndDeleteFunctions(): Functions {
  let lastEditType = "";
  return {
    editFn: () => {
      lastEditType = "edit";
    },
    deleteFn: () => {
      lastEditType = "delete";
    },
    getFn: () => lastEditType,
  };
}

function renderComponent(
  categoryName: string,
  deletable: boolean,
  onEdit: () => void,
  onDelete: () => void
): Components {
  render(
    <CategoryItem
      categoryName={categoryName}
      deletable={deletable}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
  return {
    categoryText: screen.getByText(categoryName),
    editIcon: screen.getByRole("button", { name: /edit/i }),
    deleteIcon: screen.queryByRole("button", { name: /delete/i }),
    user: userEvent.setup(),
  };
}

describe("Category Item", () => {
  it("Displays the category name and icons", () => {
    const { editFn, deleteFn } = generateEditAndDeleteFunctions();
    const { deleteIcon } = renderComponent("Required", true, editFn, deleteFn);
    expect(deleteIcon).not.toBeNull();
  });
  it("Calls the edit and delete functions", async () => {
    const { editFn, deleteFn, getFn } = generateEditAndDeleteFunctions();
    const { editIcon, deleteIcon, user } = renderComponent(
      "Miscellaneous",
      true,
      editFn,
      deleteFn
    );
    expect(deleteIcon).not.toBeNull();
    await user.click(editIcon);
    expect(getFn()).toBe("edit");
    if (deleteIcon) await user.click(deleteIcon);
    expect(getFn()).toBe("delete");
  });
  it("Only displays edit icon for non-deletable categories", async () => {
    const { editFn, deleteFn } = generateEditAndDeleteFunctions();
    const { deleteIcon } = renderComponent("Other", false, editFn, deleteFn);
    expect(deleteIcon).toBeNull();
  });
});

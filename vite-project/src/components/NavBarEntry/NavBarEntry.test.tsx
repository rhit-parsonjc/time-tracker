import { render, screen } from "@testing-library/react";
import NavBarEntry from "./NavBarEntry";
import { IconName } from "../Icon/Icon";
import userEvent, { UserEvent } from "@testing-library/user-event";

interface Component {
  isTabSelected: () => boolean;
  user: UserEvent;
}

function renderComponent(
  tabLabel: string,
  iconName: IconName,
  initiallySelected: boolean
): Component {
  let selected = initiallySelected;
  function selectTab() {
    selected = true;
  }
  function isTabSelected() {
    return selected;
  }
  render(
    <NavBarEntry
      tabLabel={tabLabel}
      selectTab={selectTab}
      iconName={iconName}
      selected={selected}
    />
  );
  return {
    isTabSelected,
    user: userEvent.setup(),
  };
}

describe("NavBarEntry tests", () => {
  it("displays the tab name", () => {
    renderComponent("Edit", "edit", true);
    screen.getByText("Edit");
  });
  it("selects the tab when clicked", async () => {
    const { isTabSelected, user } = renderComponent("Delete", "delete", false);
    expect(isTabSelected()).toBe(false);
    await user.click(screen.getByRole("button"));
    expect(isTabSelected()).toBe(true);
  });
});

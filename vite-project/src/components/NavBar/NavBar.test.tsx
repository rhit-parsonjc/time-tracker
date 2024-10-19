import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { TabName } from "../App/App";
import userEvent, { UserEvent } from "@testing-library/user-event";

interface TabComponents {
  getSelectedTab: () => string;
  addTab: HTMLElement;
  editTab: HTMLElement;
  deleteTab: HTMLElement;
  importTab: HTMLElement;
  statsTab: HTMLElement;
  categoriesTab: HTMLElement;
  user: UserEvent;
}

function renderComponent(initialTab: TabName): TabComponents {
  let selectedTab: TabName = initialTab;
  function setSelectedTab(tabName: TabName) {
    selectedTab = tabName;
  }
  function getSelectedTab() {
    return selectedTab;
  }
  render(<NavBar tabName={selectedTab} setTabName={setSelectedTab} />);
  return {
    getSelectedTab,
    addTab: screen.getByRole("button", { name: /add entry/i }),
    editTab: screen.getByRole("button", { name: /edit entry/i }),
    deleteTab: screen.getByRole("button", { name: /delete entry/i }),
    importTab: screen.getByRole("button", { name: /import entries/i }),
    statsTab: screen.getByRole("button", { name: /view statistics/i }),
    categoriesTab: screen.getByRole("button", { name: /change categories/i }),
    user: userEvent.setup(),
  };
}

describe("NavBar tests", () => {
  it("displays all of the tab names", () => {
    renderComponent("ADD");
  });
  it("allows switching between tabs", async () => {
    const {
      getSelectedTab,
      addTab,
      editTab,
      deleteTab,
      importTab,
      statsTab,
      categoriesTab,
    } = renderComponent("ADD");
    expect(getSelectedTab()).toBe("ADD");
    await userEvent.click(editTab);
    expect(getSelectedTab()).toBe("EDIT");
    await userEvent.click(deleteTab);
    expect(getSelectedTab()).toBe("DELETE");
    await userEvent.click(importTab);
    expect(getSelectedTab()).toBe("IMPORT");
    await userEvent.click(statsTab);
    expect(getSelectedTab()).toBe("STATS");
    await userEvent.click(categoriesTab);
    expect(getSelectedTab()).toBe("CATEGORIES");
  });
});

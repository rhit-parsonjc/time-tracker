import { TabName } from "../App/App";
import NavBarEntry from "../NavBarEntry/NavBarEntry";
import styles from "./NavBar.module.css";

interface Props {
  tabName: TabName;
  setTabName: (tabName: TabName) => void;
}

function NavBar(props: Props) {
  const { tabName, setTabName } = props;
  return (
    <nav id={styles.navBar}>
      <ul style={{ margin: "0" }}>
        <NavBarEntry
          selectTab={() => setTabName("ADD")}
          iconName="add"
          selected={tabName === "ADD"}
          tabLabel="Add Entry"
        />
        <NavBarEntry
          selectTab={() => setTabName("EDIT")}
          iconName="edit"
          selected={tabName === "EDIT"}
          tabLabel="Edit Entry"
        />
        <NavBarEntry
          selectTab={() => setTabName("DELETE")}
          iconName="delete"
          selected={tabName === "DELETE"}
          tabLabel="Delete Entry"
        />
        <NavBarEntry
          selectTab={() => setTabName("IMPORT")}
          iconName="import"
          selected={tabName === "IMPORT"}
          tabLabel="Import Entries"
        />
        <NavBarEntry
          selectTab={() => setTabName("STATS")}
          iconName="stats"
          selected={tabName === "STATS"}
          tabLabel="View Statistics"
        />
        <NavBarEntry
          selectTab={() => setTabName("CATEGORIES")}
          iconName="categories"
          selected={tabName === "CATEGORIES"}
          tabLabel="Change Categories"
        />
      </ul>
    </nav>
  );
}

export default NavBar;

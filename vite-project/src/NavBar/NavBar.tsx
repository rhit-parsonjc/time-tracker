import { TabName } from "../App/App";
import Icon from "../Icon/Icon";
import styles from "./NavBar.module.css";

type Props = {
  tabName: TabName;
  setTabName: (tabName: TabName) => void;
};

function NavBar(props: Props) {
  const { tabName, setTabName } = props;
  return (
    <nav id={styles.navbar}>
      <ul>
        <li
          className={tabName === "ADD" ? styles.selected : styles.notselected}
          onClick={() => setTabName("ADD")}
        >
          <div className={styles.icon}>
            <Icon iconName="add" />
          </div>
          <h1>Add Entry</h1>
        </li>
        <li
          className={
            tabName === "DELETE" ? styles.selected : styles.notselected
          }
          onClick={() => setTabName("DELETE")}
        >
          <div className={styles.icon}>
            <Icon iconName="delete" />
          </div>
          <h1>Delete Entry</h1>
        </li>
        <li
          className={
            tabName === "IMPORT" ? styles.selected : styles.notselected
          }
          onClick={() => setTabName("IMPORT")}
        >
          <div className={styles.icon}>
            <Icon iconName="import" />
          </div>
          <h1>Import Entries</h1>
        </li>
        <li
          className={tabName === "STATS" ? styles.selected : styles.notselected}
          onClick={() => setTabName("STATS")}
        >
          <div className={styles.icon}>
            <Icon iconName="stats" />
          </div>
          <h1>View Statistics</h1>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

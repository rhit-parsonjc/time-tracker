import { wrapClickHandler } from "../../data/Utilities";
import Icon, { IconName } from "../Icon/Icon";
import styles from "./NavBarEntry.module.css";

interface Props {
  tabLabel: string;
  selectTab: () => void;
  iconName: IconName;
  selected: boolean;
}

function NavBarEntry(props: Props) {
  const { tabLabel, selectTab, iconName, selected } = props;
  return (
    <li>
      <button
        className={selected ? styles.selected : styles.notSelected}
        onClick={selectTab}
        onKeyDown={wrapClickHandler(selectTab)}
        id={styles.navBarEntry}
      >
        <div id={styles.navBarIcon}>
          <Icon iconName={iconName} />
        </div>
        <h1>{tabLabel}</h1>
      </button>
    </li>
  );
}

export default NavBarEntry;

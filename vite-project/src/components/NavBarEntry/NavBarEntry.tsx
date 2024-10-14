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
    <li
      className={selected ? styles.selected : styles.notSelected}
      onClick={selectTab}
      id={styles.navBarEntry}
    >
      <div id={styles.navBarIcon}>
        <Icon iconName={iconName} />
      </div>
      <h1>{tabLabel}</h1>
    </li>
  );
}

export default NavBarEntry;

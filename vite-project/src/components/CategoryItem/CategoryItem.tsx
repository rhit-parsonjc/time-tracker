import { wrapClickHandler } from "../../data/Utilities";
import Icon from "../Icon/Icon";
import styles from "./CategoryItem.module.css";

interface Props {
  categoryName: string;
  onDelete: () => void;
  onEdit: () => void;
}

function CategoryItem(props: Props) {
  const { categoryName, onDelete, onEdit } = props;
  return (
    <li>
      <div id={styles.categoryBox} tabIndex={0}>
        <p>{categoryName}</p>
        <div id={styles.icons}>
          <div
            id={styles.editIcon}
            className={styles.icon}
            tabIndex={0}
            onClick={onEdit}
            onKeyDown={wrapClickHandler(onEdit)}
          >
            <Icon iconName="edit" />
          </div>
          <div
            id={styles.deleteIcon}
            className={styles.icon}
            tabIndex={0}
            onClick={onDelete}
            onKeyDown={wrapClickHandler(onDelete)}
          >
            <Icon iconName="delete" />
          </div>
        </div>
      </div>
    </li>
  );
}

export default CategoryItem;

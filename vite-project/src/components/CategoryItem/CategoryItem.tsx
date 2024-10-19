import { wrapClickHandler } from "../../data/Utilities";
import Icon from "../Icon/Icon";
import styles from "./CategoryItem.module.css";

interface Props {
  categoryName: string;
  onDelete: () => void;
  onEdit: () => void;
  deletable: boolean;
}

function CategoryItem(props: Props) {
  const { categoryName, onDelete, onEdit, deletable } = props;
  return (
    <li>
      <div id={styles.categoryBox} tabIndex={0}>
        <p>{categoryName}</p>
        <div id={styles.icons}>
          <button
            id={styles.editIcon}
            className={styles.icon}
            tabIndex={0}
            onClick={onEdit}
            onKeyDown={wrapClickHandler(onEdit)}
          >
            <Icon iconName="edit" />
            <p style={{ fontSize: "0.7em" }}>Edit</p>
          </button>
          <button
            id={styles.deleteIcon}
            className={styles.icon}
            tabIndex={0}
            onClick={onDelete}
            onKeyDown={wrapClickHandler(onDelete)}
            style={deletable ? {} : { visibility: "hidden" }}
          >
            <Icon iconName="delete" />
            <p style={{ fontSize: "0.7em" }}>Delete</p>
          </button>
        </div>
      </div>
    </li>
  );
}

export default CategoryItem;

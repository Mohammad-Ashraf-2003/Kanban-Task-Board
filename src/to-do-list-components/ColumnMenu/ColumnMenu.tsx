import styles from "./ColumnMenu.module.scss";
import type { IColumnMenu } from "../../types";

const ColumnMenu = ({ columnId, onAddCard, onDeleteColumn }: IColumnMenu) => {
  return (
    <div className={styles.columnMenuList}>
      <button
        type="button"
        className={styles.columnMenuItem}
        onClick={() => onAddCard(columnId)}
      >
        Add Card
      </button>

      <button
        type="button"
        className={styles.columnMenuItem}
        onClick={() => onDeleteColumn(columnId)}
      >
        Delete Column
      </button>
    </div>
  );
};

export default ColumnMenu;

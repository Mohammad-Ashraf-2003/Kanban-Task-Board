import styles from "./DropHereCard.module.scss";
import type { IDropHereCard } from "../../types";

const DropHereCard = ({
  columnId,
  hoveredDropColumn,
  onDragOverColumn,
  onDragLeaveColumn,
  onDropToColumn,
}: IDropHereCard) => {
  const isActive = hoveredDropColumn === columnId;

  return (
    <div
      className={`${styles.dropHereCard} ${
        isActive ? styles.dropHereCardActive : ""
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        onDragOverColumn(columnId);
      }}
      onDragLeave={onDragLeaveColumn}
      onDrop={(event) => {
        event.preventDefault();
        onDropToColumn(columnId);
      }}
    >
      {isActive ? "Drop card here" : "Drop here"}
    </div>
  );
};

export default DropHereCard;

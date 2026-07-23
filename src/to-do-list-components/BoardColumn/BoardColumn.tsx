import type { IBoardColumn } from "../../types";
import CardItem from "../CardItem/CardItem";
import ColumnMenu from "../ColumnMenu/ColumnMenu";
import DropHereCard from "../DropHereCard/DropHereCard";
import styles from "./BoardColumn.module.scss";

const BoardColumn = ({
  column,
  cards,
  isMenuOpen,
  hoveredDropColumn,
  onToggleMenu,
  onAddCard,
  onDeleteColumn,
  onEditCard,
  onDeleteCard,
  onDragStart,
  onDragEnd,
  draggedCardId,
  hoveredDropCardId,
  onDragOverCard,
  onDragLeaveCard,
  onDropToCard,
  onDragOverColumn,
  onDragLeaveColumn,
  onDropToColumn,
  getDescriptionPreview,
}: IBoardColumn) => {
  const isActive = hoveredDropColumn === column.id;

  return (
    <div
      className={`${styles.column} ${isActive ? styles.columnActive : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        onDragOverColumn(column.id);
      }}
      onDragLeave={onDragLeaveColumn}
      onDrop={(event) => {
        event.preventDefault();
        onDropToColumn(column.id);
      }}
    >
      <div className={styles.columnHeader}>
        <div className={styles.columnNameAndCount}>
          <h2>{column.title}</h2>
          <span>{cards.length}</span>
        </div>

        <button
          type="button"
          className={styles.columnMenuButton}
          aria-label="Column menu"
          onClick={() => onToggleMenu(column.id)}
        >
          <span className={styles.horizontalEllipsis}>...</span>
        </button>
      </div>

      {isMenuOpen ? (
        <ColumnMenu
          columnId={column.id}
          onAddCard={onAddCard}
          onDeleteColumn={onDeleteColumn}
        />
      ) : null}

      <div className={styles.cardItems}>
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            columnId={column.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            draggedCardId={draggedCardId}
            hoveredDropCardId={hoveredDropCardId}
            onDragOverCard={onDragOverCard}
            onDragLeaveCard={onDragLeaveCard}
            onDropToCard={onDropToCard}
            onEditCard={onEditCard}
            onDeleteCard={onDeleteCard}
            getDescriptionPreview={getDescriptionPreview}
          />
        ))}
      </div>

      {!cards.length && (
        <DropHereCard
          columnId={column.id}
          hoveredDropColumn={hoveredDropColumn}
          onDragOverColumn={onDragOverColumn}
          onDragLeaveColumn={onDragLeaveColumn}
          onDropToColumn={onDropToColumn}
        />
      )}
    </div>
  );
};

export default BoardColumn;

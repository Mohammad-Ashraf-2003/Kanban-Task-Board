import styles from "./CardItem.module.scss";
import type { ICardItem } from "../../types";

const CardItem = ({
  card,
  columnId,
  onDragStart,
  onDragEnd,
  draggedCardId,
  hoveredDropCardId,
  onDragOverCard,
  onDragLeaveCard,
  onDropToCard,
  onEditCard,
  onDeleteCard,
  getDescriptionPreview,
}: ICardItem) => {
  const isDragging = draggedCardId === card.id;
  const isDropTarget = hoveredDropCardId === card.id && !isDragging;
  const tagClassName = card.tag
    ? styles[
        `cardItemTag${card.tag.charAt(0).toUpperCase()}${card.tag.slice(1)}`
      ]
    : "";

  return (
    <div
      className={`${styles.cardItem} ${isDragging ? styles.cardItemDragging : ""} ${
        isDropTarget ? styles.cardItemDropTarget : ""
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        onDragOverCard(card.id);
      }}
      onDragLeave={onDragLeaveCard}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onDropToCard(columnId, card.id);
      }}
    >
      <div
        className={styles.cardDragHandle}
        draggable
        onDragStart={(event) => {
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", card.id);
          onDragStart(card.id, columnId);
        }}
        onDragEnd={onDragEnd}
      >
        ⋮⋮
      </div>

      {card.tag ? (
        <span className={`${styles.cardItemTag} ${tagClassName}`}>
          {card.tag}
        </span>
      ) : null}

      <div className={styles.cardItemTitle}>{card.title}</div>

      <b className={styles.cardItemDescription}>
        {getDescriptionPreview(card.description)}
      </b>

      <div className={styles.cardActions}>
        <button
          type="button"
          className={styles.actionButton}
          onClick={() => onEditCard(card.id)}
        >
          ✎
        </button>

        <button
          type="button"
          className={styles.actionButton}
          onClick={() => onDeleteCard(columnId, card.id)}
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default CardItem;

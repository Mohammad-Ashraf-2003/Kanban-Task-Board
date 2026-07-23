import styles from "./App.module.scss";
import useApp from "./useApp";
import BoardColumn from "./to-do-list-components/BoardColumn/BoardColumn";
import BoardHeader from "./to-do-list-components/BoardHeader/BoardHeader";
function App() {
  const {
    boardState,
    showAddColumnDialog,
    activeColumnMenuId,
    toggleColumnMenu,
    showAddCardDialog,
    showEditCardDialog,
    handleDragStart,
    handleDragEnd,
    draggedCardId,
    handleDropToColumn,
    hoveredDropCardId,
    setHoveredDropCardId,
    handleDragOverCard,
    handleDropToCard,
    hoveredDropColumn,
    setHoveredDropColumn,
    showDeleteColumnDialog,
    search,
    setSearch,
    getFilteredCardIdsForColumn,
    handleDeleteCard,
    getDescriptionPreview,
  } = useApp();

  return (
    <section className={styles.center}>
      <div className={styles.board}>
        <BoardHeader
          search={search}
          onSearchChange={setSearch}
          onAddColumn={showAddColumnDialog}
        />

        <div className={styles.columns}>
          {boardState.columnOrder.map((columnId) => {
            const column = boardState.columns[columnId];

            const cards = getFilteredCardIdsForColumn(column.id).map(
              (cardId) => boardState.cards[cardId],
            );

            return (
              <BoardColumn
                key={column.id}
                column={column}
                cards={cards}
                isMenuOpen={activeColumnMenuId === column.id}
                hoveredDropColumn={hoveredDropColumn}
                onToggleMenu={toggleColumnMenu}
                onAddCard={showAddCardDialog}
                onDeleteColumn={showDeleteColumnDialog}
                onEditCard={showEditCardDialog}
                onDeleteCard={handleDeleteCard}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                draggedCardId={draggedCardId}
                hoveredDropCardId={hoveredDropCardId}
                onDragOverCard={handleDragOverCard}
                onDragLeaveCard={() => setHoveredDropCardId(null)}
                onDropToCard={(columnId, cardId) => {
                  handleDropToCard(columnId, cardId);
                  handleDragEnd();
                }}
                onDragOverColumn={setHoveredDropColumn}
                onDragLeaveColumn={() => setHoveredDropColumn(null)}
                onDropToColumn={(columnId) => {
                  handleDropToColumn(columnId);
                  setHoveredDropColumn(null);
                  handleDragEnd();
                }}
                getDescriptionPreview={getDescriptionPreview}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default App;

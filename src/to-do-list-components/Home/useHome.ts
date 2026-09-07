import { useState } from "react";
import Swal from "sweetalert2";
import { type BoardState, type Card, type Column, type IHome, initialState } from "../../types";

const accessibleModalOptions = {
  allowEscapeKey: true,
  returnFocus: true,
  focusConfirm: false,
  stopKeydownPropagation: true,
  keydownListenerCapture: true,
};

const useHome = ({ search, setSearch }: IHome) => {
  const [boardState, setBoardState] = useState<BoardState>(initialState);
  const [activeColumnMenuId, setActiveColumnMenuId] = useState<string | null>(
    null,
  );
  const [hoveredDropColumn, setHoveredDropColumn] = useState<string | null>(
    null,
  );
  const [hoveredDropCardId, setHoveredDropCardId] = useState<string | null>(
    null,
  );
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [draggedSourceColumnId, setDraggedSourceColumnId] = useState<
    string | null
  >(null);
  

  const handleDragStart = (cardId: string, columnId: string) => {
    setDraggedCardId(cardId);
    setDraggedSourceColumnId(columnId);
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    if (!columnId || !cardId) {
      return;
    }

    confirmDeleteCardDialog(columnId, cardId);
  };

  const getDescriptionPreview = (description: string) => {
    if (!description) {
      return "No description";
    }

    return description.length > 20
      ? `${description.slice(0, 20)}...`
      : description;
  };

  const handleDropToColumn = (destinationColumnId: string) => {
    if (!draggedCardId || !draggedSourceColumnId) {
      return;
    }

    moveCard(
      draggedCardId,
      undefined,
      draggedSourceColumnId,
      destinationColumnId,
    );
    setDraggedCardId(null);
    setDraggedSourceColumnId(null);
  };

  const handleDragEnd = () => {
    setDraggedCardId(null);
    setDraggedSourceColumnId(null);
    setHoveredDropColumn(null);
    setHoveredDropCardId(null);
  };

  const handleDragOverCard = (cardId: string) => {
    if (cardId !== draggedCardId) {
      setHoveredDropCardId(cardId);
    }
  };

  const handleDropToCard = (
    destinationColumnId: string,
    overCardId: string,
  ) => {
    if (
      !draggedCardId ||
      !draggedSourceColumnId ||
      draggedCardId === overCardId
    ) {
      return;
    }

    moveCard(
      draggedCardId,
      overCardId,
      draggedSourceColumnId,
      destinationColumnId,
    );
    setDraggedCardId(null);
    setDraggedSourceColumnId(null);
    setHoveredDropColumn(null);
    setHoveredDropCardId(null);
  };

  const toggleColumnMenu = (columnId: string) => {
    setActiveColumnMenuId((current) =>
      current === columnId ? null : columnId,
    );
  };

  const addColumn = (title: string) => {
    const newColumnId = crypto.randomUUID();

    const newColumn: Column = {
      id: newColumnId,
      title,
      cardIds: [],
    };

    setBoardState((prevState) => ({
      ...prevState,
      columns: {
        ...prevState.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...prevState.columnOrder, newColumnId],
    }));

    Swal.fire({
      ...accessibleModalOptions,
      title: "Column Added Successfully",
      text: `Column "${title}" created successfully`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const showAddColumnDialog = async () => {
    const { value: columnTitle } = await Swal.fire({
      ...accessibleModalOptions,
      title: "Add New Column",
      input: "text",
      inputPlaceholder: "Enter column name",
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Column name is required";
        }
        if (value.trim().length === 0) {
          return "Column name cannot be empty";
        }
      },
    });

    if (columnTitle) {
      addColumn(columnTitle.trim());
    }
  };

  const deleteColumn = (columnId: string) => {
    setBoardState((prevState) => {
      const column = prevState.columns[columnId];
      if (!column) {
        return prevState;
      }

      const updatedCards = { ...prevState.cards };
      column.cardIds.forEach((cardId) => {
        delete updatedCards[cardId];
      });

      const updatedColumns = { ...prevState.columns };
      delete updatedColumns[columnId];

      return {
        ...prevState,
        cards: updatedCards,
        columns: updatedColumns,
        columnOrder: prevState.columnOrder.filter((id) => id !== columnId),
      };
    });
  };

  const addCard = (
    columnId: string,
    title: string,
    description: string,
    tag: string,
  ) => {
    const newCardId = crypto.randomUUID();

    const newCard: Card = {
      id: newCardId,
      title,
      description,
      tag,
    };

    setBoardState((prevState) => {
      const column = prevState.columns[columnId];

      return {
        ...prevState,
        cards: {
          ...prevState.cards,
          [newCardId]: newCard,
        },
        columns: {
          ...prevState.columns,
          [columnId]: {
            ...column,
            cardIds: [...column.cardIds, newCardId],
          },
        },
      };
    });

    Swal.fire({
      ...accessibleModalOptions,
      title: "Added Successful",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const showAddCardDialog = async (columnId: string) => {
    const { value: title } = await Swal.fire({
      ...accessibleModalOptions,
      title: "Add New Card",
      input: "text",
      inputPlaceholder: "Card title",
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.trim().length === 0) {
          return "Card title is required";
        }
      },
    });

    if (!title) {
      return;
    }

    const { value: description } = await Swal.fire({
      ...accessibleModalOptions,
      title: "Card Description",
      input: "textarea",
      inputPlaceholder: "Card description (optional)",
      inputValue: "",
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    });

    if (description === undefined) {
      return;
    }

    const { value: tag } = await Swal.fire({
      ...accessibleModalOptions,
      title: "Card Tag",
      input: "select",
      inputOptions: {
        design: "Design",
        research: "Research",
        setup: "Setup",
        dev: "Dev",
        high: "High Priority",
        medium: "Medium Priority",
        low: "Low Priority",
      },
      inputValidator: (value) => {
        if (!value || value.trim().length === 0) {
          return "Card Tag is required";
        }
      },
      inputPlaceholder: "Select a tag",
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    });

    if (!tag) {
      return;
    }

    addCard(columnId, title.trim(), description?.trim() ?? "", tag);
    setActiveColumnMenuId(null);
  };

  const deleteCard = (columnId: string, cardId: string) => {
    setBoardState((prevState) => {
      const updatedCards = { ...prevState.cards };
      delete updatedCards[cardId];

      const column = prevState.columns[columnId];

      return {
        ...prevState,
        cards: updatedCards,
        columns: {
          ...prevState.columns,
          [columnId]: {
            ...column,
            cardIds: column.cardIds.filter((id) => id !== cardId),
          },
        },
      };
    });
  };

  const showDeleteColumnDialog = async (columnId: string) => {
    const column = boardState.columns[columnId];
    if (!column) {
      return;
    }

    const result = await Swal.fire({
      ...accessibleModalOptions,
      title: "Delete column?",
      text:
        column.cardIds.length > 0
          ? `This will delete column "${column.title}" and its ${column.cardIds.length} card(s).`
          : `This will delete column "${column.title}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      deleteColumn(columnId);
      Swal.fire({
        ...accessibleModalOptions,
        title: "Deleted",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const editCard = (
    cardId: string,
    title: string,
    description: string,
    tag: string,
  ) => {
    setBoardState((prevState) => ({
      ...prevState,
      cards: {
        ...prevState.cards,
        [cardId]: {
          ...prevState.cards[cardId],
          title,
          description,
          tag,
        },
      },
    }));
  };

  const showEditCardDialog = async (cardId: string) => {
    const card = boardState.cards[cardId];
    if (!card) return;

    const { value: title } = await Swal.fire({
      ...accessibleModalOptions,
      title: "Edit Title Card",
      input: "text",
      inputPlaceholder: "Card title",
      inputValue: card.title,
      confirmButtonText: "Next",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.trim().length === 0) {
          return "Card title is required";
        }
      },
    });

    if (!title) {
      return;
    }

    const { value: description } = await Swal.fire({
      ...accessibleModalOptions,
      title: "Card Description",
      input: "textarea",
      inputPlaceholder: "Card description",
      inputValue: card.description,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    });

    if (description === undefined) {
      return;
    }
    const { value: tag } = await Swal.fire({
      ...accessibleModalOptions,
      title: "Card Tag",
      input: "select",
      inputOptions: {
        design: "Design",
        research: "Research",
        setup: "Setup",
        dev: "Dev",
        high: "High Priority",
        medium: "Medium Priority",
        low: "Low Priority",
      },
      inputValue: card.tag ?? "",
      inputPlaceholder: "Select a tag",
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    });

    if (!tag) {
      return;
    }

    editCard(cardId, title.trim(), description?.trim() ?? "", tag);

    Swal.fire({
      ...accessibleModalOptions,
      title: "Edited Successful",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const moveCard = (
    activeCardId: string,
    overCardId: string | undefined,
    sourceColumnId: string,
    destinationColumnId: string,
  ) => {
    setBoardState((prevState) => {
      const sourceColumn = prevState.columns[sourceColumnId];
      const destinationColumn = prevState.columns[destinationColumnId];

      if (!sourceColumn || !destinationColumn) {
        return prevState;
      }

      if (sourceColumnId === destinationColumnId) {
        const newCardIds = [...sourceColumn.cardIds];
        const activeIndex = newCardIds.indexOf(activeCardId);

        if (activeIndex === -1) {
          return prevState;
        }

        const [movedCard] = newCardIds.splice(activeIndex, 1);
        const targetIndex = overCardId
          ? newCardIds.indexOf(overCardId)
          : newCardIds.length;

        newCardIds.splice(
          targetIndex === -1 ? newCardIds.length : targetIndex,
          0,
          movedCard,
        );

        return {
          ...prevState,
          columns: {
            ...prevState.columns,
            [sourceColumnId]: {
              ...sourceColumn,
              cardIds: newCardIds,
            },
          },
        };
      }

      const sourceCardIds = [...sourceColumn.cardIds];
      const destinationCardIds = [...destinationColumn.cardIds];
      const activeIndex = sourceCardIds.indexOf(activeCardId);

      if (activeIndex === -1) {
        return prevState;
      }

      const [movedCard] = sourceCardIds.splice(activeIndex, 1);
      const targetIndex = overCardId
        ? destinationCardIds.indexOf(overCardId)
        : destinationCardIds.length;

      destinationCardIds.splice(
        targetIndex === -1 ? destinationCardIds.length : targetIndex,
        0,
        movedCard,
      );

      return {
        ...prevState,
        columns: {
          ...prevState.columns,
          [sourceColumnId]: {
            ...sourceColumn,
            cardIds: sourceCardIds,
          },
          [destinationColumnId]: {
            ...destinationColumn,
            cardIds: destinationCardIds,
          },
        },
      };
    });
  };

  const confirmDeleteCardDialog = async (columnId: string, cardId: string) => {
    if (!columnId || !cardId) {
      return;
    }

    const result = await Swal.fire({
      ...accessibleModalOptions,
      title: "Delete card?",
      text: "Are you sure you want to delete this card?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      deleteCard(columnId, cardId);
      Swal.fire({
        ...accessibleModalOptions,
        title: "Deleted",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const getFilteredCardIdsForColumn = (columnId: string) => {
    const column = boardState.columns[columnId];
    if (!column) {
      return [];
    }
    const lowerSearch = search.toLowerCase();
    return column.cardIds.filter((cardId) => {
      const card = boardState.cards[cardId];
      return card.title.toLowerCase().includes(lowerSearch);
    });
  };

  return {
    boardState,
    showAddColumnDialog,
    showDeleteColumnDialog,
    activeColumnMenuId,
    toggleColumnMenu,
    showAddCardDialog,
    showEditCardDialog,
    confirmDeleteCardDialog,
    handleDeleteCard,
    getDescriptionPreview,
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
    search,
    setSearch,
    getFilteredCardIdsForColumn,
  };
};

export default useHome;

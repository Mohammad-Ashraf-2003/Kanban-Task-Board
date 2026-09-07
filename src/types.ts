export type Card = {
  id: string;
  title: string;
  description: string;
  tag?: string;
};

export type Column = {
  id: string;
  title: string;
  cardIds: string[];
};

export type BoardState = {
  columns: Record<string, Column>;
  cards: Record<string, Card>;
  columnOrder: string[];
};

export type IBoardColumn = {
  column: Column;
  cards: Card[];
  isMenuOpen: boolean;
  hoveredDropColumn: string | null;
  onToggleMenu: (columnId: string) => void;
  onAddCard: (columnId: string) => void;
  onDeleteColumn: (columnId: string) => void;
  onEditCard: (cardId: string) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
  onDragStart: (cardId: string, columnId: string) => void;
  onDragEnd: () => void;
  draggedCardId: string | null;
  hoveredDropCardId: string | null;
  onDragOverCard: (cardId: string) => void;
  onDragLeaveCard: () => void;
  onDropToCard: (columnId: string, cardId: string) => void;
  onDragOverColumn: (columnId: string) => void;
  onDragLeaveColumn: () => void;
  onDropToColumn: (columnId: string) => void;
  getDescriptionPreview: (description: string) => string;
};

export type IBoardHeader = {
  search: string;
  onSearchChange: (value: string) => void;
  onAddColumn: () => void;
};

export type IColumnMenu = {
  columnId: string;
  onAddCard: (columnId: string) => void;
  onDeleteColumn: (columnId: string) => void;
};

export type IDropHereCard = {
  columnId: string;
  hoveredDropColumn: string | null;
  onDragOverColumn: (columnId: string) => void;
  onDragLeaveColumn: () => void;
  onDropToColumn: (columnId: string) => void;
};

export const initialState: BoardState = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      cardIds: ["card-1", "card-2", "card-3"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      cardIds: ["card-4"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      cardIds: ["card-5", "card-6"],
    },
  },

  cards: {
    "card-1": {
      id: "card-1",
      title: "Wireframe the POI share sheet",
      description: "iOS + Android variants...",
      tag: "design",
    },
    "card-2": {
      id: "card-2",
      title: "Compare dnd libraries",
      description: "dnd-kit vs beautiful-dnd",
      tag: "research",
    },
    "card-3": {
      id: "card-3",
      title: "Set up project repo",
      description: "Initialize repository and branches",
      tag: "setup",
    },
    "card-4": {
      id: "card-4",
      title: "Build column component",
      description: "dragging...",
      tag: "dev",
    },
    "card-5": {
      id: "card-5",
      title: "Init Vite + React",
      description: "Project setup",
      tag: "setup",
    },
    "card-6": {
      id: "card-6",
      title: "Define state model",
      description: "Plan board data structure",
      tag: "setup",
    },
  },

  columnOrder: ["column-1", "column-2", "column-3"],
};

export type ICardItem = {
  card: Card;
  columnId: string;
  onDragStart: (cardId: string, columnId: string) => void;
  onDragEnd: () => void;
  draggedCardId: string | null;
  hoveredDropCardId: string | null;
  onDragOverCard: (cardId: string) => void;
  onDragLeaveCard: () => void;
  onDropToCard: (columnId: string, cardId: string) => void;
  onEditCard: (cardId: string) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
  getDescriptionPreview: (description: string) => string;
};

export type IHome = {
  search: string;
  setSearch: (value: string) => void;
};
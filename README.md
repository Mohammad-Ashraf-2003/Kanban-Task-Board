# Kanban Task Board

A responsive Kanban task board built with React and TypeScript.

The project was created to practice modern frontend development concepts such as component-based architecture, typed state management, drag-and-drop interactions, reusable components, responsive layouts, form validation, and accessible confirmation dialogs.

![Kanban Task Board preview](src/assets/hero.png)

## Features

- Create and delete board columns
- Create, edit, and delete task cards
- Move cards between columns using drag and drop
- Reorder cards within the same column
- Search cards by title
- Add descriptions and category or priority tags
- Display task counts for each column
- Confirmation dialogs for destructive actions
- Form validation for card and column data
- Responsive user interface
- Empty-column drop zones

## Tech Stack

- React 19
- TypeScript
- Vite
- SCSS Modules
- SweetAlert2
- HTML5 Drag and Drop API
- ESLint

## Architecture

```text
App
 |
 |---- useApp
 |      - Board state
 |      - Card and column operations
 |      - Search filtering
 |      - Drag-and-drop logic
 |      - SweetAlert2 dialogs
 |
 |---- BoardHeader
 |      - Board title
 |      - Card search
 |      - Add-column action
 |
 |---- BoardColumn
        - Column header and task count
        - Column actions
        - Card list
        |
        |---- CardItem
        |      - Task details and tag
        |      - Edit and delete actions
        |      - Drag handle
        |
        |---- DropHereCard
               - Empty-column drop target
```

## Main Flow

### Create a Column

The application:

1. Opens a dialog for the column title.
2. Validates that the title is not empty.
3. Generates a unique ID using `crypto.randomUUID()`.
4. Adds the column to the board.
5. Displays a success message.

### Create a Card

The application:

1. Asks for the card title.
2. Accepts an optional description.
3. Requires a category or priority tag.
4. Generates a unique card ID.
5. Adds the card to the selected column.

Available tags:

- Design
- Research
- Setup
- Dev
- High Priority
- Medium Priority
- Low Priority

### Move a Card

```text
Drag a card
     |
     v
Select a destination
     |
     |---- Another card   -> Insert before that card
     |
     |---- Empty space    -> Append to the column
     |
     |---- Empty column   -> Move into its drop zone
```

Cards can be reordered within their current column or moved to a different column.

### Search

The search field filters cards by title in real time. Matching is case-insensitive, and each column updates its visible card count based on the filtered results.

## State Model

The board uses a normalized state structure:

```ts
type BoardState = {
  columns: Record<string, Column>;
  cards: Record<string, Card>;
  columnOrder: string[];
};
```

- `columns` stores each column and its ordered card IDs.
- `cards` stores task data by card ID.
- `columnOrder` controls the order in which columns are displayed.

## Local Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

### Create a Production Build

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

## Project Structure

```text
src/
|-- assets/
|-- to-do-list-components/
|   |-- BoardColumn/
|   |-- BoardHeader/
|   |-- CardItem/
|   |-- ColumnMenu/
|   `-- DropHereCard/
|-- App.tsx
|-- useApp.ts
|-- types.ts
`-- main.tsx
```

## Data Storage

The current version stores board data in React state. Changes remain available during the active browser session and reset when the page is refreshed.

## Future Improvements

- Persist board data with local storage
- Add a backend API and database
- Add user authentication
- Support multiple boards
- Allow column reordering
- Add task due dates and assignees
- Add custom labels
- Add dark mode
- Improve keyboard-based drag and drop
- Add unit and end-to-end tests
- Deploy the application

## Author

Mohammad Ashraf

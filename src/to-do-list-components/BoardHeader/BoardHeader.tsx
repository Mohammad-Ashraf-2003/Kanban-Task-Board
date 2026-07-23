import styles from "./BoardHeader.module.scss";
import type { IBoardHeader } from "../../types";
import AlignShapes from "../../../public/align-shapes-top-svgrepo-com.svg";
import SearchIcon from "../../../public/search.svg";

const BoardHeader = ({ search, onSearchChange, onAddColumn }: IBoardHeader) => {
  return (
    <div className={styles.boardHeader}>
      <div className={styles.boardHeaderTitle}>
        <img src={AlignShapes} alt="" /> <h2>My Board</h2>
      </div>

      <div className={styles.boardHeaderProcesses}>
        <div className={styles.borderCardsByTitle}>
          <img src={SearchIcon} alt="" />
          <input
            type="text"
            placeholder="Search cards by title"
            className={styles.searchCardsByTitle}
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <button
          type="button"
          className={styles.addColumnsButton}
          onClick={onAddColumn}
        >
          + Add Column
        </button>
      </div>
    </div>
  );
};

export default BoardHeader;

import styles from "./page.module.css";
import { decks } from "./mocks";
import DecksTable from "./DecksTable";

export default function DecksPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Shared Decks</h1>
        <div className={styles.headerControls}>
          <button className={styles.shareButton}>Share Deck</button>
          <input
            className={styles.searchInput}
            type="text"
            defaultValue="spanish"
            placeholder="Search"
          />
          <button className={styles.searchButton}>Search</button>
        </div>
      </div>

      <DecksTable decks={decks} />
    </div>
  );
}

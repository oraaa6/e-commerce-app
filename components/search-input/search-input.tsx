import styles from "./search-input.module.scss";
import Image from "next/image";
import SearchIcon from "assets/svg/search-icon.svg";

export function SearchInput() {
  return (
    <div className={styles.searchInputContainer}>
      <div className={styles.inputContainer}>
        <Image
          src={SearchIcon}
          alt="Search"
          height={20}
          className={styles.searchIcon}
        />
        <input
          className={styles.input}
          type="text"
          name="search"
          id="search"
          placeholder="Search products..."
        />
        <label htmlFor="search" />
      </div>
      {/* <Button>Search</Button> */}
    </div>
  );
}

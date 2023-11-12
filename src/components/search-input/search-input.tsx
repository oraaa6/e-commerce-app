import styles from "./search-input.module.scss";
import Image from "next/image";
import SearchIcon from "assets/svg/search-icon.svg";
import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  aligned?: boolean;
}

export function SearchInput({ aligned = false, ...props }: SearchInputProps) {
  return (
    <div
      className={clsx(
        styles.searchInputContainer,
        aligned ? styles.aligned : null
      )}
    >
      <div className={styles.inputContainer}>
        <Image
          src={SearchIcon}
          alt="Search"
          height={20}
          className={styles.searchIcon}
        />
        <input
          {...props}
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

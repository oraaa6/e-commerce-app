import styles from "./search-input.module.scss";
import Image from "next/image";
import SearchIcon from "../../assets/svg/search-icon.svg";
import { Button } from "../button/button";
import { useQuery } from "react-query";
import axiosClient from "@/utils/axios";

export function SearchInput() {
  const query = useQuery(["products"], () => axiosClient.get("products"));

  return (
    <div className={styles.searchInputContainer}>
      <div className={styles.inputContainer}>
        <Image
          src={SearchIcon}
          alt="Search"
          height={29}
          className={styles.searchIcon}
          color="red"
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
      <Button>Search</Button>
    </div>
  );
}

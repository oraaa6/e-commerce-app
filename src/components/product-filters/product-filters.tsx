import { Controller, useForm } from "react-hook-form";
import { Input } from "../input/input";
import { SearchInput } from "../search-input/search-input";
import styles from "./product-filters.module.scss";

type ProductFiltersProps = {
  onChange: (name: string) => void;
  value: string;
};
export function ProductFilters({ onChange, value }: ProductFiltersProps) {
  return (
    <div className={styles.filtersContainer}>
      <SearchInput
        onChange={(event) => onChange(event.target.value)}
        value={value}
        name="name"
      />
    </div>
  );
}

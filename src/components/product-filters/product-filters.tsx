import { Input } from "../input/input";
import { SearchInput } from "../search-input/search-input";
import styles from "./product-filters.module.scss";
import { Filters } from "@/app/(routes)/men/page";

type ProductFiltersProps = {
  onChange: ({ searchPhrase, maxPrice, minPrice }: Filters) => void;
  values: Filters;
};
export function ProductFilters({ onChange, values }: ProductFiltersProps) {
  const numberRegex = /^(\s*|\d+)$/;

  return (
    <div className={styles.filtersContainer}>
      <SearchInput
        onChange={(event) =>
          onChange({ ...values, searchPhrase: event.target.value })
        }
        value={values.searchPhrase}
        name="name"
      />
      <div className={styles.priceRangeContainer}>
        <Input
          name="minPrice"
          type="text"
          label="Min price"
          value={values.minPrice}
          errorMessage={
            +values.minPrice < 1 || +values.minPrice > 9999
              ? "Minimum value must be between 1 and 9999"
              : ""
          }
          onChange={(event) => {
            if (numberRegex.test(event.target.value)) {
              onChange({ ...values, minPrice: event.target.value });
            }
          }}
        />
        <Input
          name="maxPrice"
          label="Max price"
          errorMessage={
            +values.maxPrice > 10000 || +values.maxPrice < 2
              ? "Maximum value must be between 2 and 10000"
              : ""
          }
          value={values.maxPrice}
          onChange={(event) => {
            if (numberRegex.test(event.target.value)) {
              onChange({ ...values, maxPrice: event.target.value });
            }
          }}
        />
      </div>
    </div>
  );
}

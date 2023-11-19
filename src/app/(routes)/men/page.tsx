"use client";

import { ProductCell } from "@/components/product-cell/product-cell";
import { Products } from "@/types/products.types";
import styles from "./men.module.scss";
import { PageContainer } from "@/components/page-container/page-container";
import { useState } from "react";
import { ProductFilters } from "@/components/product-filters/product-filters";
import { useDebounce } from "@/hooks/use-debounce";
import { Spinner } from "@/components/spinner/spinner";
import { Pagination } from "@/components/paginate/paginate";

export type Filters = {
  searchPhrase: string;
  minPrice: string;
  maxPrice: string;
};

export type ProductsRange = {
  offset: number;
  limit: number;
};

export default function Man() {
  const [products, setProducts] = useState<undefined | Products>();
  const [filterValues, setFilterValues] = useState<Filters>({
    searchPhrase: "",
    minPrice: "1",
    maxPrice: "10000",
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;
  const [amountOfProducts, setAmountOfProducts] = useState(0);

  const priceRangeParam =
    filterValues.minPrice || filterValues.maxPrice
      ? `&price_min=${filterValues.minPrice}&price_max=${filterValues.maxPrice}`
      : "";
  const searchPhraseParam = filterValues.searchPhrase
    ? "&title=" + filterValues.searchPhrase
    : "";

  useDebounce(
    () => {
      if (+filterValues.minPrice < 1 || +filterValues.maxPrice > 10000) {
        return null;
      }
      setLoading(true);
      const fetchData = async () => {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products?${searchPhraseParam}${priceRangeParam}`
        );

        if (!response.ok) {
          setLoading(false);
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setAmountOfProducts(result.length);
        setProducts(result);
        setLoading(false);
      };
      fetchData();
    },
    [filterValues, currentPage],
    500
  );
  const lastProductIndex = currentPage * 30;
  const firstProductIndex = lastProductIndex - 30;
  const currentProducts = products?.slice(firstProductIndex, lastProductIndex);

  const renderProducts = () => {
    if (loading) {
      return <Spinner />;
    } else if (!currentProducts?.length) {
      return <p>No products found</p>;
    } else {
      return currentProducts?.map(({ title, id, images, price }) => (
        <ProductCell
          image={images[0]}
          key={id}
          title={title}
          price={price}
          id={id}
        />
      ));
    }
  };

  return (
    <PageContainer>
      <div className={styles.contentContainer}>
        <ProductFilters onChange={setFilterValues} values={filterValues} />
        <div className={styles.productsContainer}>{renderProducts()}</div>
      </div>
      {!loading && (
        <div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={amountOfProducts}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </PageContainer>
  );
}

"use client";

import { Products } from "@/types/products.types";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import CategoryProducts from "@/components/category-products/category-products";

export type Filters = {
  searchPhrase: string;
  minPrice: string;
  maxPrice: string;
};

export type ProductsRange = {
  offset: number;
  limit: number;
};

export default function Jewelery() {
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
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = products?.slice(firstProductIndex, lastProductIndex);

  return (
    <CategoryProducts
      loading={loading}
      currentProducts={currentProducts}
      productsPerPage={productsPerPage}
      amountOfProducts={amountOfProducts}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      filterValues={filterValues}
      setFilterValues={setFilterValues}
    />
  );
}

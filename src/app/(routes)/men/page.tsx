"use client";

import { ProductCell } from "@/components/product-cell/product-cell";
import { Products } from "@/types/products.types";
import styles from "./men.module.scss";
import { PageContainer } from "@/components/page-container/page-container";
import { useState } from "react";
import { ProductFilters } from "@/components/product-filters/product-filters";
import { useDebounce } from "@/hooks/use-debounce";
import { Spinner } from "@/components/spinner/spinner";

export default function Man() {
  const [products, setProducts] = useState<undefined | Products>();
  const [seachPhrase, setSearchPhrase] = useState("");
  const [loading, setLoading] = useState(false);

  useDebounce(
    () => {
      setLoading(true);
      const fetchData = async () => {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products?offset=0&limit=20${
            seachPhrase ? "&title=" + seachPhrase : ""
          }`
        );

        if (!response.ok) {
          setLoading(false);
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setProducts(result);
        setLoading(false);
      };
      fetchData();
    },
    [seachPhrase],
    500
  );

  return (
    <PageContainer>
      <div className={styles.contentContainer}>
        <ProductFilters onChange={setSearchPhrase} value={seachPhrase} />
        <div className={styles.productsContainer}>
          {loading ? (
            <Spinner />
          ) : (
            products?.map(({ title, id, images, price }) => (
              <ProductCell
                image={images[0]}
                key={id}
                title={title}
                price={price}
                id={id}
              />
            ))
          )}
        </div>
      </div>
    </PageContainer>
  );
}

"use client";

import { ProductCell } from "@/components/product-cell/product-cell";
import { Products } from "@/types/products.types";
import styles from "./men.module.scss";
import { PageContainer } from "@/components/page-container/page-container";
import { useEffect, useState } from "react";

// async function getMensProducts() {
//   const response = await fetch(
//     "https://api.escuelajs.co/api/v1/products?offset=0&limit=20"
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return response.json();
// }

export default function Man() {
  const [products, setProducts] = useState<undefined | Products>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/products?offset=0&limit=20"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setProducts(result);
    };
    fetchData();
  }, []);

  // const products: Products = await getMensProducts();

  return (
    <PageContainer>
      <div className={styles.productsContainer}>
        {products?.map(({ title, id, images, price }) => (
          <ProductCell
            image={images[0]}
            key={id}
            title={title}
            price={price}
            id={id}
          />
        ))}
      </div>
    </PageContainer>
  );
}

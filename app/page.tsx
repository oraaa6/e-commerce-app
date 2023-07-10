"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useQuery } from "react-query";
import axiosClient from "@/utils/axios";
import { PageContainer } from "@/components/page-container/page-container";
import { Product } from "@/types/products.types";

type Error = {
  message: string;
};
export default function Home() {
  const query = useQuery<Product[]>(["products"], () =>
    axiosClient.get("products").then((response) => response.data)
  );

  const products = query?.data;

  return (
    <main>
      <PageContainer>
        <div className={styles.cartsContainer}>
          {products?.map((product) => (
            <div className={styles.cartContainer} key={product.id}>
              <Image
                src={product.image}
                alt="Search"
                width={230}
                height={230}
                className={styles.cartImage}
              />
              <h3 className={styles.cartTitle}>{product.title}</h3>
              <p className={styles.price}>{product.price}$</p>
            </div>
          ))}
        </div>
      </PageContainer>
    </main>
  );
}

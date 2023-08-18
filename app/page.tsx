"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useQuery } from "react-query";
import axiosClient from "@/utils/axios";
import { PageContainer } from "@/components/page-container/page-container";
import { Products } from "@/types/products.types";
import { BestPricesHeader } from "@/components/best-prices-header/best-prices-header";
import { ProductCard } from "@/components/product-card/product-card";
import { SliderProduct } from "@/components/slider/slider";
import { NavCover } from "@/components/nav-cover/nav-cover";
import { CategoriesCards } from "@/components/categories-cards/categories-cards";

export default function Home() {
  const query = useQuery<Products>(["products"], () =>
    axiosClient.get("products?limit=18").then((response) => response.data)
  );

  const products = query?.data || [];

  return (
    <main>
      <NavCover/>
      <PageContainer>
     <CategoriesCards/>
        <SliderProduct products={products} />

      </PageContainer>
    </main>
  );
}

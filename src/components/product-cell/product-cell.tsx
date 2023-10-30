"use client";

import Image from "next/image";
import styles from "./product-cell.module.scss";
import Link from "next/link";
import { Button } from "@/components/button/button";

type ProductCellProps = {
  image: string;
  title: string;
  price: string;
  id: number;
};
export function ProductCell({ image, title, price, id }: ProductCellProps) {
  async function addProduct() {
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "jewelery",
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  }
  console.log(id);
  return (
    <div className={styles.cellContainer}>
      <Link href={`/product-${id}`}>
        <div className={styles.cellImageContainer}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 600px) 90vw,
            (min-width: 1100px) 45vw,
            100vw"
            className={styles.cellImage}
          />
        </div>
        <h3 className={styles.cellTitle}>{title}</h3>
        <p className={styles.price}>{price}$</p>
      </Link>
      <Button onClick={addProduct}>Add</Button>
    </div>
  );
}

"use client";

import Image from "next/image";
import styles from "./product-card.module.scss";

type ProductCardProps = {
  image: string;
  title: string;
  price: string;
};
export function ProductCard({ image, title, price }: ProductCardProps) {
  return (
    <div className={styles.cartContainer}>
      <Image
        src={image}
        width={230}
        height={230}
        alt={title}
        className={styles.cartImage}
      />
      <h3 className={styles.cartTitle}>{title}</h3>
      <p className={styles.price}>{price}$</p>
    </div>
  );
}

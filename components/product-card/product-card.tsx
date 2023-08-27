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
    <div className={styles.cartImageBgc}>
      <div className={styles.cartImageContainer}>
      <Image
        src={image}
        alt={title}
        fill
        className={styles.cartImage}
      />
      </div>
    </div>
    <div className={styles.productDetails}>
    <h3 className={styles.cartTitle}>{title}</h3>
    <p className={styles.price}>{price}$</p>
    </div>

    
    </div>
  );
}

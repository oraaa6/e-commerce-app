"use client";

import Image from "next/image";
import styles from "./product-card.module.scss";
import Star from "../../assets/svg/star.svg"
import { Button } from "../button/button";

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
            sizes="(min-width: 600px) 90vw,
            (min-width: 1100px) 45vw,
            100vw"
            className={styles.cartImage}
          />
        </div>
      </div>
      <div className={styles.productDetails}>
        <h3 className={styles.cartTitle}>{title}</h3>
        <p className={styles.price}>{price}$</p>
      </div>
      <div className={styles.starsContainer}>
        {Array.from(Array(5)).map((_, index) => (
          <Image
            src={Star}
            key={Math.random()*index}
            alt={'star'}
            width={15}
            height={15}
            className={styles.star}
          />
        ))}
        <sup className={styles.numberOfStars}>(2137)</sup>

      </div>
<Button white slim>Add to card</Button>

    </div>
  );
}

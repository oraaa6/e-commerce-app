"use client";

import Image from "next/image";
import styles from "./product-card.module.scss";
import Star from "assets/svg/star.svg";
import { Button } from "components/button/button";
import Link from "next/link";
import { createSearchParam } from "@/utils/get-search-params";
import { useDispatch } from "react-redux";
import { updateProducts } from "@/slices/product.slice";
import { useSelector } from "react-redux";
import { products } from "@/slices/product.slice";
type ProductCardProps = {
  image: string;
  title: string;
  price: string;
  id: string;
};
export function ProductCard({ image, title, price, id }: ProductCardProps) {
  const dispatch = useDispatch();
  const product = useSelector(products);
  const handleClick = () => {
    dispatch(
      updateProducts({ productId: id, productName: title, price, amount: 1 })
    );
  };

  const param = createSearchParam(title);
  return (
    <Link href={`/product-${id}`}>
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
              key={Math.random() * index}
              alt={"star"}
              width={15}
              height={15}
              className={styles.star}
            />
          ))}
          <sup className={styles.numberOfStars}>(2137)</sup>
        </div>
        <Button onClick={handleClick} white slim>
          Add to card
        </Button>
      </div>
    </Link>
  );
}

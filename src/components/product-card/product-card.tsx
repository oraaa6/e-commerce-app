"use client";

import Image from "next/image";
import styles from "./product-card.module.scss";
import Star from "assets/svg/star.svg";
import { Button } from "components/button/button";
import Link from "next/link";
import { createSearchParam } from "@/utils/get-search-params";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/slices/product.slice";
import { products } from "@/slices/product.slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Check from "assets/svg/check.svg";
import { ClothingSizes } from "@/types/products.types";

type ProductCardProps = {
  image: string;
  title: string;
  price: string;
  id: number;
};
export function ProductCard({ image, title, price, id }: ProductCardProps) {
  const dispatch = useDispatch();
  const product = useSelector(products);

  const addProduct = () => {
    const currentProductIndex = product.findIndex((item) => {
      return item[id];
    });

    if (currentProductIndex !== -1) {
      toast.info("Product is already in shopping bag");
    } else {
      dispatch(
        addProductToCart({
          productId: id,
          productName: title,
          price,
          amount: 1,
          size: ClothingSizes.S,
        })
      );
      toast.success("Product added", {
        icon: () => <Image src={Check} alt="check" height={50} />,
      });
    }
  };

  const param = createSearchParam(title);

  return (
    <div className={styles.cartContainer}>
      <Link href={`/product-${id}`}>
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
      </Link>
      <Button onClick={addProduct} white slim>
        Add to card
      </Button>
    </div>
  );
}

"use client";

import Image from "next/image";
import styles from "./product-cell.module.scss";
import Link from "next/link";
import { Button } from "@/components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, products } from "@/slices/product.slice";
import "react-toastify/dist/ReactToastify.css";
import { ClothingSizes } from "@/types/products.types";
import { toast } from "react-toastify";
import Check from "assets/svg/check.svg";
import { FallbackImage } from "../fallback-image/fallback-image";

type ProductCellProps = {
  image: string;
  title: string;
  price: string;
  id: number;
};
export function ProductCell({ image, title, price, id }: ProductCellProps) {
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
          thumbnail: image,
        })
      );
      toast.success("Product added", {
        icon: () => <Image src={Check} alt="check" height={50} />,
      });
    }
  };

  return (
    <div className={styles.cellContainer}>
      <Link href={`/product-${id}`}>
        <div className={styles.cellImageContainer}>
          <FallbackImage
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
      <Button onClick={addProduct} slim>
        Add
      </Button>
    </div>
  );
}

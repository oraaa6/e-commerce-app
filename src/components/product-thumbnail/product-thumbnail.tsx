"use client";

import styles from "./product-thumbnail.module.scss";
import Image from "next/image";

type ProductThumbnailProps = {
  productId: number;
  productName: string;
  price: string;
  amount: number;
  size: string;
  thumbnail: string;
};

export function ProductThumbnail({
  productId,
  productName,
  price,
  amount,
  size,
  thumbnail,
}: ProductThumbnailProps) {
  return (
    <div className={styles.container}>
      <Image alt={productName} src={thumbnail} />
    </div>
  );
}

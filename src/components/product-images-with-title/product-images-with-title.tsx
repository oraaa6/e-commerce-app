"use client";

import ArrowRightIcon from "assets/svg/arrow-right.svg";
import ArrowLeftIcon from "assets/svg/arrow-left.svg";
import { Arrow } from "@/components/slider/slider";
import styles from "./product-images-with-title.module.scss";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { FallbackImage } from "../fallback-image/fallback-image";

type ProductImagesWithTitleProps = {
  productTitle: string;
  productImages: string[];
};

export function ProductImagesWithTitle({
  productImages,
  productTitle,
}: ProductImagesWithTitleProps) {
  const [imageNumber, setImageNumber] = useState(0);

  const isMoreThanOneImage = productImages.length > 1;
  const nextImage = () => {
    setTimeout(() => {
      setImageNumber((prev) => (prev + 1) % 3);
    }, 500);
  };

  const previousImage = () => {
    setTimeout(() => {
      setImageNumber((prev) => (prev - 1 + 3) % 3); // trick with modulo
    }, 500);
  };

  return (
    <div className={styles.producutDescriptionContainer}>
      <div className={styles.imageContainer}>
        {isMoreThanOneImage && (
          <Arrow
            image={ArrowLeftIcon}
            alt="left icon"
            className={styles.arrowLeft}
            onClick={previousImage}
          />
        )}

        <FallbackImage
          key={imageNumber}
          src={productImages[imageNumber]}
          alt={productTitle}
          className={styles.image}
          fill
          sizes="(min-width: 600px) 90vw,
            (min-width: 1100px) 45vw,
            100vw"
        />
        {isMoreThanOneImage && (
          <Arrow
            image={ArrowRightIcon}
            alt="right icon"
            className={styles.arrowRight}
            onClick={nextImage}
          />
        )}
      </div>

      <h3 className={styles.title}>{productTitle}</h3>
    </div>
  );
}

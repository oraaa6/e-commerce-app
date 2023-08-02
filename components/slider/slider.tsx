import Slider from "react-slick";
import { ProductCard } from "../product-card/product-card";
import { Products } from "@/types/products.types";
import { useRef, useState } from "react";
import styles from './slider.module.scss'
import Image, { StaticImageData } from "next/image";
import ArrowRightIcon from '../../assets/svg/arrow-right.svg'
import ArrowLeftIcon from '../../assets/svg/arrow-left.svg'
import clsx from 'clsx'

type ArrowProps = {
image: StaticImageData;
alt: string;
onClick?: () => void;
className?: string;
style?: React.CSSProperties
}

function Arrow({image, alt, onClick, className, style}: ArrowProps) {

  return (
    <div
    className={clsx(className, styles.arrow)}
    style={{ ...style, display: "block"}}
    onClick={onClick}
  >
<Image
    src={image}
    width={30}
    height={30}
    alt={alt}
    className={styles.cartImage}
  />
  </div>
  );
}


export function SliderProduct({ products }: { products: Products }) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,

    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
          nextArrow: <Arrow image={ArrowRightIcon} alt="right icon"/>,
          prevArrow: <Arrow image={ArrowLeftIcon} alt="left icon"/>,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
    <Slider {...settings}>
      {products.map(({ id, title, price, image }) => (
        <ProductCard key={id} title={title} price={price} image={image} />
      ))}
    </Slider>
    </div>
  );
}


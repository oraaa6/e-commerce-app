import Slider from "react-slick";
import { ProductCard } from "../product-card/product-card";
import { Products } from "@/types/products.types";
import { useRef, useState } from "react";
import styles from './slider.module.scss'
import clsx from 'clsx'

export function SliderProduct({ products }: { products: Products }) {
  const [activeCard, setActiveCard] = useState(0);
  const sliderRef = useRef<Slider>(null)
  const renderCustomDot = (index: number) => {
    console.log(index === activeCard)
    return (<div
      className={clsx(styles.dot)}
    />)
  };

  // console.log(activeCard)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // dotsClass: styles.dots,
    slidesToShow: 4,
    slidesToScroll: 4,
    customPaging: renderCustomDot,
    beforeChange: (current: number, next: number) => {
      console.log(current, next)
      setActiveCard(next);
    },
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
          arrows: true,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
    <Slider {...settings} ref={sliderRef}>
      {products.map(({ id, title, price, image }) => (
        <ProductCard key={id} title={title} price={price} image={image} />
      ))}
    </Slider>
    </div>
  );
}


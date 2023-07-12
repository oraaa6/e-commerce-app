import Slider from "react-slick";
import { ProductCard } from "../product-card/product-card";
import { Products } from "@/types/products.types";

export function SliderProduct({ products }: { products: Products }) {
  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "0",
    infinite: true,
    focusOnSelect: true,
    arrows: false,
    slidesToShow: 3,
    speed: 500,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {products.map(({ id, title, price, image }) => (
        <ProductCard key={id} title={title} price={price} image={image} />
      ))}
    </Slider>
  );
}

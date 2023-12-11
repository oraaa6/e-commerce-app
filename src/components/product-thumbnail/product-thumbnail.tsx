"use client";

import styles from "./product-thumbnail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, products } from "@/slices/product.slice";
import { FallbackImage } from "../fallback-image/fallback-image";
import { PlusMinutButton } from "../plus-minus-button/plus-munus-button";

export function ProductThumbnail() {
  const dispatch = useDispatch();
  const product = useSelector(products);
  const transformedProducts = product.map((element) => {
    const [key, values] = Object.entries(element)[0];
    return {
      productName: values.productName,
      price: values.price,
      amount: values.amount,
      size: values.size,
      thumbnail: values.thumbnail,
      productId: Number(key),
    };
  });

  const totalPrice = transformedProducts.reduce((accumulator, currentValue) => {
    let currentAmount =
      Number(currentValue.price) * Number(currentValue.amount);
    return accumulator + currentAmount;
  }, 0);

  return (
    <div className={styles.container}>
      {transformedProducts.map(
        ({ productName, thumbnail, amount, size, price }, index) => (
          <div className={styles.containerProduct} key={productName}>
            <FallbackImage
              className={styles.image}
              alt={productName}
              src={thumbnail}
              width={200}
              height={200}
            />
            <div className={styles.containerLeft}>
              <p className={styles.productName}>{productName}</p>
              <p className={styles.size}>Size: {size}</p>
              <div className={styles.amountContainer}>
                <PlusMinutButton
                  onClick={() => {
                    dispatch(
                      addProductToCart({
                        ...transformedProducts[index],
                        amount: amount - 1,
                      })
                    );
                  }}
                >
                  -
                </PlusMinutButton>
                <p className={styles.amount}>{amount}</p>
                <PlusMinutButton
                  onClick={() => {
                    console.log("add");
                    dispatch(
                      addProductToCart({
                        ...transformedProducts[index],
                        amount: amount + 1,
                      })
                    );
                  }}
                >
                  +
                </PlusMinutButton>
              </div>
            </div>
            <div className={styles.containerRight}>
              <p className={styles.price}>{Number(price) * amount} $</p>
            </div>
          </div>
        )
      )}
      <p className={styles.totalPrice}>Total: {totalPrice}</p>
    </div>
  );
}

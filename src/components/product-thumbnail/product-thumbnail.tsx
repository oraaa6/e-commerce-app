"use client";

import { useState } from "react";
import { Input } from "../input/input";
import styles from "./product-thumbnail.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, products } from "@/slices/product.slice";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../button/button";

export function ProductThumbnail() {
  const dispatch = useDispatch();
  const product = useSelector(products);

  const transformedProducts = product.map((element) => {
    const [, values] = Object.entries(element)[0];
    return {
      productName: values.productName,
      price: values.price,
      amount: values.amount,
      size: values.size,
      thumbnail: values.thumbnail,
    };
  });

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, errors, isSubmitting },
    setError,
  } = useForm({
    mode: "all",
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = () => {}; // todo

  return (
    <div className={styles.container}>
      {transformedProducts.map(
        ({ productName, thumbnail, amount, size, price }) => (
          <>
            <div className={styles.containerLeft}>
              <p className={styles.productName}>{productName}</p>
              <Image alt={productName} src={thumbnail} width={50} height={50} />
            </div>
            <div className={styles.containerRight}>
              <p className={styles.totalPrice}>{Number(price) * amount}</p>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Controller
                  control={control}
                  name="amount"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      value={""}
                      // todo
                      onChange={() => {}}
                      name="amount"
                      label="Amount"
                      type="number"
                    />
                  )}
                />
                <Button
                  type="submit"
                  disabled={!isDirty || !isValid || isSubmitting}
                >
                  Update
                </Button>
              </form>
            </div>
          </>
        )
      )}
    </div>
  );
}

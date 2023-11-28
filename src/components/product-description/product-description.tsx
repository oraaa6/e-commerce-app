"use client";

import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { sizeOptions } from "@/app/(routes)/[slug]/products.utils";
import { Select } from "../select/select";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, products } from "@/slices/product.slice";
import styles from "./product-description.module.scss";
import { toast } from "react-toastify";
import Check from "assets/svg/check.svg";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

type ProductDescriptionProps = {
  description: string;
  price: string;
  id: number;
  name: string;
  thumbnail: string;
};
type FormValues = {
  size: string;
  amount: number;
};

export function ProductDescription({
  description,
  price,
  id,
  name,
  thumbnail,
}: ProductDescriptionProps) {
  const product = useSelector(products);
  const dispatch = useDispatch();

  const getDefaultValues = () => {
    const currentProductIndex = product.findIndex((item) => {
      return item[id];
    });

    if (currentProductIndex !== -1) {
      return {
        size: product[currentProductIndex][id].size,
        amount: product[currentProductIndex][id].amount,
      };
    }
    return { size: "xxs", amount: 1 };
  };

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: getDefaultValues(),
  });

  const onSubmit = ({ size, amount }: FormValues) => {
    const currentProductIndex = product.findIndex((item) => {
      return item[id];
    });

    dispatch(
      addProductToCart({
        productId: id,
        productName: name,
        price,
        amount,
        size,
        thumbnail,
      })
    );

    if (
      currentProductIndex !== -1 &&
      (size !== getDefaultValues().size || amount !== getDefaultValues().amount)
    ) {
      toast.info("Shopping bag updated");
    } else if (
      currentProductIndex !== -1 &&
      size === getDefaultValues().size &&
      amount === getDefaultValues().amount
    ) {
      toast.info("Product is already in shopping bag");
    } else {
      toast.success("Product added", {
        icon: () => <Image src={Check} alt="check" height={50} />,
      });
    }
  };

  return (
    <>
      <p className={styles.description}>{description}</p>
      <h2> {price} $</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          control={control}
          name="size"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              options={sizeOptions}
              selectLabel="Size"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="amount"
          rules={{ required: true, min: 1, max: 50 }}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChange={onChange}
              name="amount"
              label="Amount"
              type="number"
            />
          )}
        />
        <Button type="submit" disabled={!isValid}>
          Add to cart
        </Button>
      </form>
    </>
  );
}

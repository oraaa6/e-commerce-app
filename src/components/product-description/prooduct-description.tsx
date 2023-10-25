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

type ProductDescriptionProps = {
  description: string;
  price: string;
  category: "electronics" | "men's clothing" | "jewelery" | "women's clothing";
  id: number;
  name: string;
};
type FormValues = {
  size: string;
  amount: number;
};

export function ProductDescription({
  description,
  price,
  category,
  id,
  name,
}: ProductDescriptionProps) {
  const product = useSelector(products);

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
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: "all",

    defaultValues: { ...getDefaultValues() },
  });

  const dispatch = useDispatch();

  const onSubmit = ({ size, amount }: FormValues) => {
    dispatch(
      addProductToCart({
        productId: id,
        productName: name,
        price,
        amount,
        size,
      })
    );
  };

  const isClothing =
    category === "men's clothing" || category === "women's clothing";

  return (
    <>
      <p className={"styles.description"}>{description}</p>
      <h2> {price} $</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isClothing && (
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
        )}

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

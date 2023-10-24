"use client";

import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { sizeOptions } from "@/app/(routes)/[slug]/products.utils";
import { Select } from "../select/select";
import { Input } from "../input/input";
import { Button } from "../button/button";

type ProductDescriptionProps = {
  description: string;
  price: string;
  category?: "electronics" | "men's clothing" | "jewelery" | "women's clothing";
};
type FormValues = {
  size: string;
  amount: number;
};

export function ProductDescription({
  description,
  price,
  category,
}: ProductDescriptionProps) {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: "all",

    defaultValues: {
      size: "xxs",
      amount: 1,
    },
  });

  const onSubmit = ({ size, amount }: FormValues) => {
    console.log(size);
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

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
};
type FormValues = {
  size: string;
  amount: number;
};

export function ProductDescription({
  description,
  price,
}: ProductDescriptionProps) {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: "all",

    defaultValues: {
      size: "",
      amount: 0,
    },
  });

  const onSubmit = ({ size, amount }: FormValues) => {
    console.log(size);
  };
  return (
    <>
      <p className={"styles.description"}>{description}</p>
      <h3>price: {price} $</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          rules={{ required: true }}
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
        <Button type="submit" disabled={!isDirty || !isValid}>
          Add to cart
        </Button>
      </form>
    </>
  );
}

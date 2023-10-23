"use client";

import * as React from "react";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import styles from "./select.module.scss";

type Option = {
  label: string;
  value: string;
};

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  selectLabel: string;
  disabled?: boolean;
}
export function Select({
  options,
  disabled,
  selectLabel,
  value,
  onChange,
}: SelectProps) {
  return (
    <div className={styles.selectBox}>
      <label htmlFor={selectLabel} className={styles.label}>
        {selectLabel}
      </label>
      <select
        onChange={onChange}
        value={value}
        name={selectLabel}
        className={styles.select}
        id={selectLabel}
        disabled={disabled}
      >
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

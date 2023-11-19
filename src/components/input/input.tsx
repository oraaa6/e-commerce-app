import { InputHTMLAttributes, useState } from "react";
import styles from "./input.module.scss";
import clsx from "clsx";
import EyeClosed from "assets/svg/eye-close.svg";
import EyeOpened from "assets/svg/eye-open.svg";
import Image from "next/image";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  errorMessage?: string;
  withIcon?: boolean;
  inputType?: "password" | "text";
}

export function Input({
  name,
  label,
  errorMessage,
  withIcon = false,
  inputType = "text",
  ...props
}: InputProps) {
  const [focus, setFocus] = useState(false);
  const [type, setType] = useState<"password" | "text">(inputType);

  return (
    <>
      <div className={styles.inputContainer}>
        <label
          className={clsx(styles.label, errorMessage && styles.labelError)}
          htmlFor={name}
        >
          {label}
        </label>

        <div
          className={clsx(
            styles.inputWrapper,
            errorMessage && styles.inputWrapperError,
            focus && styles.inputWrapperFocused,
            props?.disabled && styles.inputWrapperDisabled
          )}
        >
          {withIcon &&
            (type === "password" ? (
              <Image
                className={styles.eye}
                src={EyeClosed}
                alt="Show password"
                height={30}
                onClick={() => setType("text")}
              />
            ) : (
              <Image
                className={styles.eye}
                src={EyeOpened}
                alt="Hide password"
                height={30}
                onClick={() => setType("password")}
              />
            ))}
          <input
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={styles.input}
            name={name}
            id={name}
            type={type || props.type}
            {...props}
          />
        </div>
        {errorMessage ? (
          <p className={styles.errorMessage}>{errorMessage}</p>
        ) : null}
      </div>
    </>
  );
}

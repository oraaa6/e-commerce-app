
import { ButtonHTMLAttributes, HtmlHTMLAttributes } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
  slim?: boolean;
  white?: boolean;
  animate?: boolean;
};

export function Button({ children, white = false, style, slim, animate, ...props }: ButtonProps) {

  const {disabled} = props;
  return (
    <button
      className={clsx(styles.button, white && styles.whiteButton, slim && styles.slim, animate && styles.animation, disabled && styles.disabled )}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}

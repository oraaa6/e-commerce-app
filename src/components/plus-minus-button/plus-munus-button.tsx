import { ButtonHTMLAttributes, HtmlHTMLAttributes } from "react";
import styles from "./plus-minus-button.module.scss";
import clsx from "clsx";

interface PlusMinutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
  slim?: boolean;
  white?: boolean;
  animate?: boolean;
}

export function PlusMinutButton({
  children,
  white = false,
  style,
  slim,
  animate,
  ...props
}: PlusMinutButtonProps) {
  const { disabled } = props;
  return (
    <button
      className={clsx(styles.button, disabled && styles.disabled)}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}

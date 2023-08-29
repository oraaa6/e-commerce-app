import styles from "./button.module.scss";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  slim?: boolean;
  white?: boolean;
  animate?: boolean;
};

export function Button({ children, onClick, white = false, style, slim, animate}: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, white && styles.whiteButton, slim && styles.slim, animate && styles.animation)}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

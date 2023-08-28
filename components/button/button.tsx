import styles from "./button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  white?: boolean;
};

export function Button({ children, onClick, white = false }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${white && styles.whiteButton}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

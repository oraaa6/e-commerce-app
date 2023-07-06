import styles from "./button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  slim?: boolean;
};

export function Button({ children, onClick, slim = false }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${slim && styles.slimButton}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

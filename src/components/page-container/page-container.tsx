import { ReactNode } from "react";
import styles from "./page-container.module.scss";

type PageContainerProps = {
  children: ReactNode;
};
export function PageContainer({ children }: PageContainerProps) {
  return <div className={styles.pageContainer}>{children}</div>;
}

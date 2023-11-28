import { PageContainer } from "@/components/page-container/page-container";
import styles from "./page.module.scss";

export default function Cart() {
  return (
    <PageContainer>
      <h1 className={styles.header}>Your products</h1>
    </PageContainer>
  );
}

import { PageContainer } from "@/components/page-container/page-container";
import styles from "./page.module.scss";
import { ProductThumbnail } from "@/components/product-thumbnail/product-thumbnail";

export default function Cart() {
  return (
    <PageContainer>
      <h1 className={styles.header}>Your products</h1>
      <ProductThumbnail />
    </PageContainer>
  );
}

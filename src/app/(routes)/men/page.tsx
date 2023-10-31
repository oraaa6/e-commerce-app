import { ProductCell } from "@/components/product-cell/product-cell";
import { Products } from "@/types/products.types";
import styles from "./men.module.scss";
import { PageContainer } from "@/components/page-container/page-container";

async function getMensProducts() {
  const response = await fetch("https://api.escuelajs.co/api/v1/products");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default async function Man() {
  const products: Products = await getMensProducts();

  return (
    <PageContainer>
      <div className={styles.productsContainer}>
        {products.map(({ title, id, images, price }) => (
          <ProductCell
            image={images[0]}
            key={id}
            title={title}
            price={price}
            id={id}
          />
        ))}
      </div>
    </PageContainer>
  );
}

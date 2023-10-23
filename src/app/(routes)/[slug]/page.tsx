import { Product } from "@/types/products.types";
import styles from "./page.module.scss";
import Image from "next/image";
import { PageContainer } from "@/components/page-container/page-container";
import { ProductDescription } from "@/components/product-description/prooduct-description";

async function getProduct(productId: string) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const idIndex = params.slug.indexOf("-");
  const product: Product = await getProduct(params.slug.slice(idIndex + 1));

  return (
    <PageContainer>
      <div className={styles.productContainer}>
        <div className={styles.leftSectionContiner}>
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              alt={product.title}
              className={styles.image}
              fill
              sizes="(min-width: 600px) 90vw,
            (min-width: 1100px) 45vw,
            100vw"
            />
          </div>
          <h3>{product.title}</h3>
        </div>
        <div className={styles.rightSectionContiner}>
          <ProductDescription
            description={product.description}
            price={product.price}
          />
        </div>
      </div>
    </PageContainer>
  );
}

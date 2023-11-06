import { Product } from "@/types/products.types";
import styles from "./page.module.scss";
import { PageContainer } from "@/components/page-container/page-container";
import { ProductDescription } from "@/components/product-description/product-description";
import { ProductImagesWithTitle } from "@/components/product-images-with-title/product-images-with-title";

async function getProduct(productId: string) {
  const response = await fetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`
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
          <ProductImagesWithTitle
            productImages={product.images}
            productTitle={product.title}
          />
        </div>
        <div className={styles.separator} />
        <div className={styles.rightSectionContiner}>
          <ProductDescription
            name={product.title}
            id={product.id}
            description={product.description}
            price={product.price}
          />
        </div>
      </div>
    </PageContainer>
  );
}

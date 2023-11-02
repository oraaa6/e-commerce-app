import { Products } from "@/types/products.types";
import { NavCover } from "@/components/nav-cover/nav-cover";
import { PageContainer } from "@/components/page-container/page-container";
import { CategoriesCards } from "@/components/categories-cards/categories-cards";
import { SliderProduct } from "@/components/slider/slider";
import { CashBack } from "@/components/cash-back/cash-back";

async function getProducts() {
  const response = await fetch(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default async function Home() {
  const products: Products = await getProducts();

  return (
    <>
      <NavCover />
      <PageContainer>
        <CategoriesCards />
        {products && <SliderProduct products={products} />}
      </PageContainer>
      <CashBack />
    </>
  );
}

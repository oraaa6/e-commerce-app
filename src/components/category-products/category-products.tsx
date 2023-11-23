"use client";

import { ProductCell } from "@/components/product-cell/product-cell";
import styles from "./category-products.module.scss";
import { PageContainer } from "@/components/page-container/page-container";
import { ProductFilters } from "@/components/product-filters/product-filters";
import { Spinner } from "@/components/spinner/spinner";
import { Pagination } from "@/components/paginate/paginate";
import { Products } from "@/types/products.types";
import { Filters } from "@/app/(routes)/men/page";

export type CategoryProducts = {
  loading: boolean;
  productsPerPage: number;
  amountOfProducts: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  filterValues: Filters;
  setFilterValues: (newFilters: Filters) => void;
  currentProducts?: Products;
};

export default function CategoryProducts({
  loading,
  currentProducts,
  productsPerPage,
  amountOfProducts,
  setCurrentPage,
  currentPage,
  filterValues,
  setFilterValues,
}: CategoryProducts) {
  const renderProducts = () => {
    if (loading) {
      return <Spinner />;
    } else if (!currentProducts?.length) {
      return <p>No products found</p>;
    } else {
      return currentProducts?.map(({ title, id, images, price }) => (
        <ProductCell
          image={images[0]}
          key={id}
          title={title}
          price={price}
          id={id}
        />
      ));
    }
  };

  return (
    <PageContainer>
      <div className={styles.contentContainer}>
        <ProductFilters onChange={setFilterValues} values={filterValues} />
        <div className={styles.productsContainer}>{renderProducts()}</div>
      </div>
      {!loading && (
        <div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={amountOfProducts}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </PageContainer>
  );
}

import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Header, PageNotFound, PageLoader } from "components/commons";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch();
      setProducts(products);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isError) return <PageNotFound />;

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col">
      <Header shouldShowBackButton={false} title="Smile Cart" />
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
      {/* Optionally render products here */}
    </div>
  );
};

export default ProductList;

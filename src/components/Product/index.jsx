import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Header, PageNotFound, PageLoader } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import { Typography } from "neetoui";
import { isNotNil, append } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

const Product = () => {
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchProduct = async () => {
    try {
      const response = await productsApi.show(slug);
      setProduct(response);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isError) return <PageNotFound />;
  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isLoading) return <PageLoader />;

  return (
    <>
      <Header title={name} />
      <div className="mt-16 flex gap-4">
        {/* Left Section: Carousel or Single Image */}
        <div className="flex w-2/5 justify-center gap-16">
          {isNotNil(imageUrls) ? (
            <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        {/* Right Section: Product Details */}
        <div className="w-3/5 space-y-4 px-6 pb-6">
          <Typography className="py-2 text-4xl font-semibold" style="h1">
            {name}
          </Typography>
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <AddToCart {...{ slug }} />
        </div>
      </div>
    </>
  );
};

export default Product;

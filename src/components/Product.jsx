import { useState, useEffect } from "react";

import axios from "axios";
import { Spinner, Typography } from "neetoui";
import { isNotNil, append } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
      );
      setProduct(response.data);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const {
    name,
    description,
    mrp = 1,
    offer_price = 1,
    image_urls = [],
    image_url = "",
  } = product;
  const totalDiscounts = mrp - offer_price;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-16 flex gap-4">
      <div className="w-2/5">
        <div className="flex justify-center gap-16">
          {isNotNil(image_urls) ? (
            <Carousel imageUrls={append(image_url, image_urls)} title={name} />
          ) : (
            <img alt={name} className="w-48" src={image_url} />
          )}
        </div>
      </div>
      <div className="w-3/5 space-y-4 px-6 pb-6">
        <Typography className="py-2 text-4xl font-semibold" style="h1">
          {name}
        </Typography>
        <Typography>{description}</Typography>
        <Typography>MRP: {mrp}</Typography>
        <Typography className="font-semibold">
          Offer price: {offer_price}
        </Typography>
        <Typography className="font-semibold text-green-600">
          {discountPercentage}% off
        </Typography>
      </div>
    </div>
  );
};

export default Product;

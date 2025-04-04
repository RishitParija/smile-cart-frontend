import Carousel from "./Carousel";
import { IMAGE_URLS } from "./constants";

const Product = () => (
  <div className="px-6 pb-6">
    {/* rest of the code */}
    <div className="w-2/5">
      <Carousel imageUrls={IMAGE_URLS} title="Infinix Inbook" />
    </div>
    {/* rest of the code */}
  </div>
);

export default Product;

import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

export default function Header() {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className="text-center text-red-500">ERROR</h1>;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
      <div className="w-full lg:w-1/3 hidden lg:block">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
      <div className="w-full lg:w-2/3">
        <ProductCarousel />
      </div>
    </div>
  );
}
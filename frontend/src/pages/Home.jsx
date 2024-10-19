import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

export default function Home() {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="container mx-auto px-4 pt-5">
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError?.error || "An error occurred"}
        </Message>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center my-8">
            <h1 className="text-3xl sm:text-4xl mb-4 sm:mb-0">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-blue-600 text-white font-bold rounded-full py-2 px-6 sm:px-10 hover:bg-blue-700 transition duration-300"
            >
              Shop
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
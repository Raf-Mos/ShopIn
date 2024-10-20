import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

export default function AllProducts() {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[13.33%] mb-4 lg:mb-0">
          <AdminMenu />
        </div>
        <div className="lg:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">
            All Products ({products.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      {moment(product.createdAt).format("MMM Do YY")}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${product.price}</span>
                    <button className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors duration-300">
                      Update
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

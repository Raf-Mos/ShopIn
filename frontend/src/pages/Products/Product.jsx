import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcons";

export default function Product({ product }) {
  return (
    <div className="w-full p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-base sm:text-lg font-medium truncate">{product.name}</div>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
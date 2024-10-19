import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

export default function Favorites() {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-center md:text-left">
        Favorite Products
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcons";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

export default function ProductDetails() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="text-blue-500 hover:underline inline-block mb-4"
      >
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg"
              />
              <HeartIcon product={product} />
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
            <p className="mb-4 text-gray-600">{product.description}</p>
            <p className="text-3xl font-bold mb-4">$ {product.price}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <FaStore className="mr-2 text-gray-600" />
                <span>Brand: {product.brand}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2 text-gray-600" />
                <span>Added: {moment(product.createdAt).fromNow()}</span>
              </div>
              <div className="flex items-center">
                <FaStar className="mr-2 text-gray-600" />
                <span>Reviews: {product.numReviews}</span>
              </div>
              <div className="flex items-center">
                <FaShoppingCart className="mr-2 text-gray-600" />
                <span>Quantity: {product.quantity}</span>
              </div>
              <div className="flex items-center">
                <FaBox className="mr-2 text-gray-600" />
                <span>In Stock: {product.countInStock}</span>
              </div>
            </div>

            <Ratings
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />

            {product.countInStock > 0 && (
              <div className="mb-4">
                <label htmlFor="qty" className="block mb-2">Quantity:</label>
                <select
                  id="qty"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="p-2 w-full rounded-lg text-black border"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition-colors"
            >
              Add To Cart
            </button>

            <div className="mt-8">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
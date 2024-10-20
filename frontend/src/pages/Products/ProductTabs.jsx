import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

export default function ProductTabs({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <section className="lg:w-1/4 mb-4 lg:mb-0">
        <div className="flex lg:flex-col">
          {["Write Your Review", "All Reviews", "Related Products"].map(
            (tab, index) => (
              <div
                key={index}
                className={`flex-1 p-2 lg:p-4 cursor-pointer text-sm lg:text-lg ${
                  activeTab === index + 1
                    ? "font-bold border-b-2 lg:border-b-0 lg:border-l-2 border-blue-500"
                    : ""
                }`}
                onClick={() => handleTabClick(index + 1)}
              >
                {tab}
              </div>
            )
          )}
        </div>
      </section>

      <section className="lg:w-3/4 lg:pl-8">
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label htmlFor="rating" className="block text-lg mb-2">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-2 border rounded-lg text-black"
                  >
                    <option value="">Select</option>
                    <option value="1">⭐ Inferior</option>
                    <option value="2">⭐⭐ Decent</option>
                    <option value="3">⭐⭐⭐ Great</option>
                    <option value="4">⭐⭐⭐⭐ Excellent</option>
                    <option value="5">⭐⭐⭐⭐⭐ Exceptional</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-lg mb-2">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded-lg text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  sign in
                </Link>{" "}
                to write a review
              </p>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-4">
            {product.reviews.length === 0 ? (
              <p>No Reviews</p>
            ) : (
              product.reviews.map((review) => (
                <div key={review._id} className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-gray-700">{review.name}</strong>
                    <p className="text-gray-500 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="mb-2">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}

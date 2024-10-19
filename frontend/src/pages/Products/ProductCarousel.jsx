import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

export default function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 w-full">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="w-full">
          {products.map(({
            image,
            _id,
            name,
            price,
            description,
            brand,
            createdAt,
            numReviews,
            rating,
            quantity,
            countInStock,
          }) => (
            <div key={_id} className="px-4">
              <img
                src={image}
                alt={name}
                className="w-full rounded-lg object-cover h-64 sm:h-80 md:h-96"
              />

              <div className="mt-4 flex flex-col sm:flex-row justify-between">
                <div className="mb-4 sm:mb-0 sm:w-1/2">
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-lg font-bold mt-2">$ {price}</p>
                  <p className="mt-4 text-sm line-clamp-3">{description}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between sm:w-1/2 text-sm">
                  <div className="mb-4 sm:mb-0">
                    <p className="flex items-center mb-2">
                      <FaStore className="mr-2" /> Brand: {brand}
                    </p>
                    <p className="flex items-center mb-2">
                      <FaClock className="mr-2" /> Added: {moment(createdAt).fromNow()}
                    </p>
                    <p className="flex items-center mb-2">
                      <FaStar className="mr-2" /> Reviews: {numReviews}
                    </p>
                  </div>

                  <div>
                    <p className="flex items-center mb-2">
                      <FaStar className="mr-2" /> Rating: {Math.round(rating)}
                    </p>
                    <p className="flex items-center mb-2">
                      <FaShoppingCart className="mr-2" /> Quantity: {quantity}
                    </p>
                    <p className="flex items-center mb-2">
                      <FaBox className="mr-2" /> In Stock: {countInStock}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
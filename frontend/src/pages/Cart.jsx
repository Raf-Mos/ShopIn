import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty</p>
          <Link to="/shop" className="text-blue-500 hover:underline">
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="lg:w-2/3">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center mb-6 pb-6 border-b">
                <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1 sm:ml-4 text-center sm:text-left">
                  <Link to={`/product/${item._id}`} className="text-blue-500 hover:underline">
                    {item.name}
                  </Link>
                  <div className="mt-2 text-gray-600">{item.brand}</div>
                  <div className="mt-2 font-bold">$ {item.price}</div>
                </div>
                <div className="flex items-center mt-4 sm:mt-0">
                  <select
                    className="p-2 border rounded text-black mr-4"
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    className="text-red-500"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between mb-4">
                <span>Items:</span>
                <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
              </div>
              <div className="flex justify-between mb-4 text-xl font-bold">
                <span>Total:</span>
                <span>
                  $ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </span>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-full text-lg w-full hover:bg-blue-600 transition-colors"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

export default function Navigation() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const favoriteCount = favorites.length;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-16 w-16" src="../images/logo.png" alt="Logo" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/cart">
                Cart
                {cartItems.length > 0 && (
                  <span className="ml-1 px-2 py-1 text-xs bg-red-500 rounded-full">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </NavLink>
              <NavLink to="/favorite">
                Favorites
                {favoriteCount > 0 && (
                  <span className="px-2 py-1 ml-1 text-sm text-white bg-red-500 rounded-full">
                    {favoriteCount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {userInfo ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="mr-2">{userInfo.username}</span>
                    <svg
                      className={`h-4 w-4 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      {userInfo.isAdmin && (
                        <>
                          <DropdownLink to="/admin/dashboard">
                            Dashboard
                          </DropdownLink>
                          <DropdownLink to="/admin/productlist">
                            Products
                          </DropdownLink>
                          <DropdownLink to="/admin/categorylist">
                            Category
                          </DropdownLink>
                          <DropdownLink to="/admin/orderlist">
                            Orders
                          </DropdownLink>
                          <DropdownLink to="/admin/userlist">
                            Users
                          </DropdownLink>
                        </>
                      )}
                      <DropdownLink to="/profile">Profile</DropdownLink>
                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/register">Register</NavLink>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <AiOutlineClose className="block h-6 w-6" />
              ) : (
                <AiOutlineMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" mobile>
              Home
            </NavLink>
            <NavLink to="/shop" mobile>
              Shop
            </NavLink>
            <NavLink to="/cart" mobile>
              Cart
              {cartItems.length > 0 && (
                <span className="ml-1 px-2 py-1 text-xs bg-red-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </NavLink>
            <NavLink to="/favorite" mobile>
              Favorites
              {favoriteCount > 0 && (
                  <span className="px-2 py-1 ml-1 text-sm text-white bg-red-500 rounded-full">
                    {favoriteCount}
                  </span>)}
            </NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {userInfo ? (
              <div className="px-2 space-y-1">
                {userInfo.isAdmin && (
                  <>
                    <NavLink to="/admin/dashboard" mobile>
                      Dashboard
                    </NavLink>
                    <NavLink to="/admin/productlist" mobile>
                      Products
                    </NavLink>
                    <NavLink to="/admin/categorylist" mobile>
                      Category
                    </NavLink>
                    <NavLink to="/admin/orderlist" mobile>
                      Orders
                    </NavLink>
                    <NavLink to="/admin/userlist" mobile>
                      Users
                    </NavLink>
                  </>
                )}
                <NavLink to="/profile" mobile>
                  Profile
                </NavLink>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <NavLink to="/login" mobile>
                  Login
                </NavLink>
                <NavLink to="/register" mobile>
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, children, mobile = false }) {
  const baseClasses = "text-sm font-medium";
  const desktopClasses =
    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md";
  const mobileClasses =
    "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
    >
      {children}
    </Link>
  );
}

function DropdownLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}

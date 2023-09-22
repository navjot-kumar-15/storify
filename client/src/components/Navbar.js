import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white border-b backdrop-blur-lg bg-opacity-80">
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
          <div className="relative flex h-16 justify-between">
            <div className="flex flex-1 items-stretch justify-start">
              <Link
                to="/"
                className="flex text-3xl italic font-bold tracking-widest flex-shrink-0 items-center"
                href="#"
              >
                StoriFy
              </Link>
            </div>
            {user ? (
              <div className="flex-shrink-0 flex align-middle px-2 py-3 items-center space-x-8 font-bold text-xl">
                <span>{user.name}</span>
                <div
                  onClick={(e) => {
                    dispatch(logoutUserAsync());
                    navigate("/login");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-red-500 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
                <Link
                  className="text-gray-700 hover:text-indigo-700 text-sm font-medium"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm "
                  to="/register"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-[5rem]">{children}</div>
    </>
  );
};

export default Navbar;

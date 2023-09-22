import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync } from "../features/auth/authSlice";
import Navbar from "../components/Navbar";
import LoginLoader from "../components/LoginLoader";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <>
      <Navbar>
        <div className="container mx-auto  ">
          <div className="flex justify-center  px-6 my-12">
            {/* Row */}
            <div className="w-full xl:w-3/4 shadow lg:w-11/12 flex">
              {/* Col */}
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1668242372382-9e6282c63578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80")',
                }}
              />
              {/* Col */}
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">
                  Create an Account!
                </h3>
                <form
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                  onSubmit={handleSubmit((data) => {
                    dispatch(registerUserAsync(data));
                    navigate("/login");
                    console.log(data);
                  })}
                >
                  <div className="mb-4 ">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="firstName"
                      >
                        Username
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        {...register("username", {
                          required: "username is required",
                        })}
                        placeholder="Username"
                      />
                      {errors?.username && (
                        <p className="text-red-500">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                      {...register("email", {
                        required: "email is required",
                      })}
                    />
                    {errors?.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        {...register("password", {
                          required: "password is required",
                        })}
                      />
                      {errors?.password && (
                        <p className="text-red-500">
                          {errors.password.message}
                        </p>
                      )}
                      {/* <p className="text-xs italic text-red-500">
                      Please choose a password.
                    </p> */}
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="c_password"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="c_password"
                        type="password"
                        placeholder="******************"
                        {...register("confirmPassword", {
                          required: "confirmPassword is required",
                          validate: (value, formValue) =>
                            value === formValue.password ||
                            "Passowrd did not matched",
                        })}
                      />
                      {errors?.confirmPassword && (
                        <p className="text-red-500">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      {isLoading ? <LoginLoader /> : "Register account"}
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <Link
                      to="/login"
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Already have an account? Login!
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default SignUp;

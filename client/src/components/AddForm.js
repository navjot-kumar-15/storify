import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { createPersonDetailsAsync } from "../features/person/personSlice";
import { useDispatch } from "react-redux";

const AddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Navbar>
        <section className="bg-white max-sm:px-5 ">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16  mt-20  shadow ">
            <h2 className="mb-4 text-3xl text-center  font-bold text-gray-800">
              Add details
            </h2>
            <form
              onSubmit={handleSubmit((data) => {
                dispatch(createPersonDetailsAsync(data));
                navigate("/");
              })}
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className=" text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  
                  dark:focus:ring-primary-500 dark:focus:border-primary-500 border-2 border-gray-400"
                    placeholder="Type your name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-900">{errors.name.message}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className=" text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  
                  dark:focus:ring-primary-500 dark:focus:border-primary-500 border-2 border-gray-400"
                    placeholder="Type your email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-900">{errors.email.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    id="email"
                    className=" text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  
                   dark:focus:ring-primary-500 dark:focus:border-primary-500 border-2 border-gray-400"
                    placeholder="Type Phone number"
                    {...register("phone", {
                      required: "min 10 digit number required",
                      maxLength: 10,
                      minLength: 10,
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-900">{errors.phone.message}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium "
                  >
                    Gender
                  </label>
                  <select
                    className="p-2 bg-slate-200 text-black"
                    {...register("gender")}
                  >
                    <option value="">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Other's</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-900">{errors.gender.message}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-3 max-sm:flex-col ">
                <button
                  type="submit"
                  className="inline-flex items-center  px-5 py-2.5 mt-4 sm:mt-6 text-md font-medium max-sm:text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Add Details
                </button>
                <Link
                  to="/"
                  type="button"
                  className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Back to Home
                </Link>
              </div>
            </form>
          </div>
        </section>
      </Navbar>
    </>
  );
};

export default AddForm;

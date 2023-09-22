import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updatePersonDetailsAsync } from "../features/person/personSlice";
import Navbar from "./Navbar";

const PopUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const { persons } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleData = () => {
    const person = persons.filter((person) => {
      return person._id === id;
    });
    setValue("name", person[0]?.name);
    setValue("email", person[0]?.email);
    setValue("phone", person[0]?.phone);
    setValue("gender", person[0]?.gender);
  };

  useEffect(() => {
    singleData();
  }, [id]);

  return (
    <>
      <Navbar>
        <section className="bg-white ">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Update details
            </h2>
            <form
              onSubmit={handleSubmit((data) => {
                const updateData = { ...data, _id: id };
                console.log(updateData);
                dispatch(updatePersonDetailsAsync(updateData));
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
                    {...register("phone")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium "
                  >
                    Gender
                  </label>
                  <select
                    className="p-2 bg-slate-400 text-white"
                    {...register("gender")}
                  >
                    <option value="">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Other's</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Update
                </button>
                <Link
                  to="/"
                  type="button"
                  className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-400 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Back
                </Link>
              </div>
            </form>
          </div>
        </section>
      </Navbar>
    </>
  );
};

export default PopUp;

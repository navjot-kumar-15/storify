import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePersonDetailsAsync,
  getFilterDataAsync,
  getPersonDetailsAsync,
} from "../features/person/personSlice";
import SeachBox from "../components/SeachBox";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const Table = () => {
  const { persons, isLoading, totalPages } = useSelector(
    (state) => state.person
  );
  const dispatch = useDispatch();
  const [dataValue, setDataValue] = useState();
  const [sort, setSort] = useState();
  const [page, setPage] = useState(1);

  const handlePage = (page) => {
    setPage(page);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDataValue(e.target.value);
  };
  const handleSort = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };
  console.log(page);

  useEffect(() => {
    const filter = { gender: dataValue };
    dispatch(getFilterDataAsync({ filter }));
  }, [dataValue]);

  useEffect(() => {
    const pagination = { page, limit: 5 };
    dispatch(getPersonDetailsAsync({ sort, pagination }));
  }, [sort, page]);

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-8 mt-5">Details</h1>
      <div className="flex justify-between items-center max-md:flex-col-reverse max-md:gap-5 max-sm:flex-col-reverse px-[4rem]">
        {/* DropDown  */}
        <div>
          <Link
            to="/add"
            className="bg-green-600 p-2 rounded-md text-white hover:bg-green-300
          transition ease-in-out cursor-pointer"
          >
            Add Details
          </Link>
        </div>
        <div className="flex gap-2  align-middle">
          <select
            name=""
            id=""
            className="border p-2 outline-none"
            onChange={(e) => handleSort(e)}
          >
            <option value="">Sort By</option>
            <option value="name">A to Z</option>
            <option value="-name">Z to A</option>
          </select>
        </div>
        <div className="flex gap-2  align-middle">
          <select
            name=""
            id=""
            className="border p-2 outline-none"
            onChange={(e) => handleChange(e)}
          >
            <option value="">Choose Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div
          className="flex gap-4 max-sm:justify-end scale-110 hover:scale-100 transition ease-in-out cursor-pointer"
          onClick={() => {
            dispatch(getPersonDetailsAsync({}));
          }}
        >
          <span className="font-bold ">Refresh</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:start-1  scale-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
        {/* DropDown  */}

        <SeachBox />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="container mx-auto px-4  sm:px-6 lg:px-8 py-8 max-md:overflow-x-scroll mt-5">
            <form>
              <table id="example" className="table-auto  w-full">
                <thead className="uppercase ">
                  <tr className="border">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Phone No</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {persons?.map((person) => (
                    <tr className="" key={person._id}>
                      <td className=" border px-4 py-2 text-center max-w-[100px] max-sm:min-w-[180px] ">
                        {person.name}
                      </td>
                      <td className=" border px-4 py-2 text-center max-md:overflow-x-scroll max-w-[120px] max-sm:min-w-[180px]">
                        {person.email}
                      </td>
                      <td className=" border px-4 py-2 text-center max-w-[100px] max-sm:min-w-[130px]">
                        {person.phone}
                      </td>
                      <td className=" border px-4 py-2 text-center max-w-[100px] max-sm:min-w-[130px]">
                        {person.gender}
                      </td>

                      <td className="border px-4 py-2 flex gap-4 justify-center max-sm:h-auto  w-auto">
                        {/* Delete */}
                        <span
                          onClick={() => {
                            dispatch(deletePersonDetailsAsync(person._id));
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </span>
                        {/* Delete */}

                        {/* Edit  */}
                        <Link to={`/${person._id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </Link>

                        {/* Edit  */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {persons?.length === 0 && (
                <p className="text-center font-bold text-3xl mt-4 w-full">
                  No data found.
                </p>
              )}
            </form>
          </div>
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
};

export default Table;

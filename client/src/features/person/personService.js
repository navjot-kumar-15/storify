import axios from "axios";

const URL = "https://storify-five.vercel.app/person";
// const URL = "http://localhost:8080/person";

// Create
export const createPersonDetail = async (value, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(`${URL}`, value, config);
  return data;
};

// Get all
export const getAllPersonDetail = async ({ search, sort }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (search) {
    const { data } = await axios.get(`${URL}?q=${search}`, config);
    return data;
  } else {
    const { data } = await axios.get(`${URL}?q=&sort=${sort}`, config);
    return data;
  }
};

// Search
// export const getSearchData = async (value, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const { data } = await axios.get(`${URL}/search?q=${value}`, config);
//   return data;
// };

// Filter
export const getFilterData = async ({ filter, sort }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let queryString = "";
  let sortString = "";

  for (let key in filter) {
    queryString += `${key}=${filter[key]}`;
  }
  for (let key in sort) {
    sortString += `${key}=${sort[key]}`;
  }

  const { data } = await axios.get(
    `${URL}/filter?${filter ? queryString : sortString}`,
    config
  );
  return data;
};

// Update
export const updatePersonDetail = async (updateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.patch(
    `${URL}/${updateData._id}`,
    updateData,
    config
  );
  return data;
};

// Delete
export const deletePersonDetail = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(`${URL}/${id}`, config);
  return data;
};

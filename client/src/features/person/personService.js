import axios from "axios";

const URL = "http://localhost:8080/person";

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
export const getAllPersonDetail = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`${URL}`, config);
  return data;
};

// Search
export const getSearchData = async (value, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`${URL}/search?q=${value}`, config);
  return data;
};

// Filter
export const getFilterData = async (value, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`${URL}/filter?gender=${value}`, config);
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

import axios from "axios";

const URL = "http://localhost:8080/auth";

export const registerUser = async (value) => {
  const { data } = await axios.post(`${URL}/register`, value);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

export const loginUser = async (value) => {
  const { data } = await axios.post(`${URL}/login`, value);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};
export const logoutUser = async () => {
  await localStorage.removeItem("user");
};

import axios from "axios";

const URL = "https://storify-five.vercel.app/auth";
// const URL = "http://localhost:8080/auth";

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
export const resetPassword = async ({ recipient_email, OTP }) => {
  const { data } = await axios.post(`${URL}/send_recovery_email`, {
    recipient_email,
    OTP,
  });
  return data;
};
export const logoutUser = async () => {
  await localStorage.removeItem("user");
};

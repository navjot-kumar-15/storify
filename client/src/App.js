import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Protect from "./features/auth/Protect";
import PopUp from "./components/PopUp";
import AddForm from "./components/AddForm";
import ResetPassword from "./components/ResetPassword";
import VerficationOTP from "./components/VerficationOTP";
import NewPassword from "./components/NewPassword";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/forgot",
  //   element: <ResetPassword />,
  // },
  // {
  //   path: "/verify",
  //   element: <VerficationOTP />,
  // },
  // {
  //   path: "/newpassword",
  //   element: <NewPassword />,
  // },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <Protect>
        {" "}
        <Home />
      </Protect>
    ),
  },
  {
    path: "/add",
    element: (
      <Protect>
        <AddForm />
      </Protect>
    ),
  },
  {
    path: "/:id",
    element: (
      <Protect>
        <PopUp />
      </Protect>
    ),
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;

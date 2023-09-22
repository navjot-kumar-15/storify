import React, { useEffect } from "react";
import Login from "./pages/Login";
import Table from "./pages/Table";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Protect from "./features/auth/Protect";
import { useDispatch } from "react-redux";
import { getPersonDetailsAsync } from "./features/person/personSlice";
import PopUp from "./components/PopUp";
import AddForm from "./components/AddForm";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPersonDetailsAsync());
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
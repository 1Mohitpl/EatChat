import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Title";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./Components/about";
import Cart from "./Components/Cart";
import Error from "./Components/Error";
import Contact from "./Components/Contact";
import RestauFood from "./Components/RestauFood";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
{
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/", // lowercase path
        element: <Body />,
      },
      {
        path: "about", // lowercase path
        element: <About />,
      },
      {
        path: "contact", // lowercase path
        element: <Contact />,
      },
      {
        path: "cart", // lowercase path
        element: <Cart/>,
      },

      {
        path: "/restaurant/:resid", // lowercase path
        element: <RestauFood />,
      },    
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);


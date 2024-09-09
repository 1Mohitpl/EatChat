import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Title";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import About from "./Components/about";
import Error from "./Components/Error";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout />,
    errorElement:<Error />,

  },
     
  {
     path:"/About",
     element: <About />,
  },
  
]);








const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

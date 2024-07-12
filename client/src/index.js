import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Pages/App";
import FlightPage from "./Pages/FlightPage";
import HotelPage from "./Pages/HotelPage";
import HomePage from "./Pages/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/destinations",
    element: <App />,
  },
  {
    path: "/flights",
    element: <FlightPage />,
  },
  {
    path: "/hotels",
    element: <HotelPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Pages/App";
import FlightPageApp from "./Pages/FlightPageApp";
import HotelPage from "./Pages/HotelPage";
import HotelDetails from "./Pages/HotelDetails";
import HomePage from "./Pages/Homepage";
import ResultsPage from "./Pages/ResultsPage";
import ResultsPage2 from "./Pages/ResultsPage2";
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
    element: <FlightPageApp />,
  },
  {
    path: "/hotels",
    element: <HotelPage />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
  },
  {
    path: "/results2",
    element: <ResultsPage2 />,
  },
  
  {
    path: "/hotels/search/details",
    element: <HotelDetails />,
  }
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

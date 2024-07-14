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
import DetailFlight from "./Pages/DetailFlight";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration"
import { UserProvider } from "./Components/UserContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "/home",
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
    path: "/detail-flight",
    element:<DetailFlight/>
  },
  {
    path: "/hotels/search/details",
    element: <HotelDetails />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

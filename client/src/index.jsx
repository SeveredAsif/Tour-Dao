import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import App from "./Pages/App";
import FlightPageApp from "./Pages/FlightPageApp";
import HotelPage from "./Pages/HotelPage";
import HotelDetails from "./Pages/HotelDetails";
import HotelPayment from "./Pages/HotelPayment";
import HotelBooking from "./Pages/HotelBooking";
import HomePage from "./Pages/Homepage";
import ResultsPage from "./Pages/ResultsPage";
import ResultsPage2 from "./Pages/ResultsPage2";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailFlight from "./Pages/DetailFlight";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Dashboard from "./Pages/Dashboard";
import { UserProvider } from "./Components/UserContext";
import Layout from "./Pages/Layout"; // Adjust the path as needed

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap everything in Layout
    children: [
      { path: "/login", element: <Login /> },
      { path: "/registration", element: <Registration /> },
      { path: "/", element: <HomePage /> },
      { path: "/destinations", element: <App /> },
      { path: "/flights", element: <FlightPageApp /> },
      { path: "/hotels", element: <HotelPage /> },
      { path: "/results", element: <ResultsPage /> },
      { path: "/results2", element: <ResultsPage2 /> },
      { path: "/detail-flight", element: <DetailFlight /> },
      { path: "/hotels/search/details", element: <HotelDetails /> },
      { path: "/hotels/booking/payment", element: <HotelPayment /> },
      { path: "/hotels/booking/details", element: <HotelBooking /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/logout", element: <Login /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import ChatPage from "./ChatPage"; // Adjust the path as needed

function Layout() {
    return (
        <>
            {/* This is where the current route component will render */}
            <Outlet />
            
            {/* ChatPage component that stays on every page */}
            <ChatPage />
        </>
    );
}

export default Layout;

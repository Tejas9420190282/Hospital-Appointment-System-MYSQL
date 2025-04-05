
// App.jsx (React)

import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home_Page from "./Pages/Home_Page";
import All_Doctors from "./Pages/All_Doctors";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Admin_Doctor_Login from "./Pages/Admin_Doctor_Login";
import User_Login from "./Pages/User_Login";
import Admin_Home from "./Pages/Admin-section/Admin_Home";
import Admin_Add_Doctor_Page from "./Pages/Admin-section/Admin_Add_Doctor_Page";
import All_Doctors_List from "./Pages/Admin-section/All_Doctors_List";

function App() {
    const [count, setCount] = useState(0);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <><Home_Page /></>,
        },
        {
            path: "/all-doctors",
            element: <><All_Doctors /></>,
        },
        {
            path: "/about",
            element: <><About /></>,
        },
        {
            path: "/contact",
            element: <><Contact /></>,
        },
        {
            path: "/admin-doctor-login",
            element: <><Admin_Doctor_Login /></>,
        },
        {
            path: "/user-login",
            element: <><User_Login /></>,
        },   

        // Admin
        {
            path: "/admin-home",
            element: <><Admin_Home /></>,
        },
        {
            path: "/admin-add-doctor",
            element: <><Admin_Add_Doctor_Page /></>,
        },
        {
            path: "/doctors-list",
            element: <><All_Doctors_List /></>,
        },


        // Users
        {
            path: "/user-home",
            element: <></>,
        },

    ]);

    return (
      <>
        <RouterProvider router={router} />
      </>
    );
}

export default App;








// App.jsx (React)

import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home_Page from "./Pages/Home_Page";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Admin_Doctor_Login from "./Pages/Admin_Doctor_Login";
import Admin_Home from "./Pages/Admin-section/Admin_Home";
import Admin_Add_Doctor_Page from "./Pages/Admin-section/Admin_Add_Doctor_Page";
import All_Doctors_List from "./Pages/Admin-section/All_Doctors_List";
import Doctor_Detail_Page from "./Pages/Doctor_Detail_Page";
import User_Login from "./components/Home/User_Pages/User_Login";
import User_Home from "./Pages/User-section/User_Home";
import User_Scedule_Appointment from "./Pages/User-section/User_Scedule_Appointment";
import Slote_Selection from "./Pages/User-section/Slote_Selection";
import Payment from "./Pages/User-section/Payment";
import All_Doctors_On_Home from "./components/Admin-component/Admin-Home-Components/All_Doctors_On_Home";


function App() {
    const [count, setCount] = useState(0);

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <>
                    <Home_Page />
                </>
            ),
        },
        {
            path: "/about",
            element: (
                <>
                    <About />
                </>
            ),
        },
        {
            path: "/contact",
            element: (
                <>
                    <Contact />
                </>
            ),
        },
        {
            path: "/admin-doctor-login",
            element: (
                <>
                    <Admin_Doctor_Login />
                </>
            ),
        },
        
        {
            path: "/doctor/:id",
            element: (
                <>
                    <Doctor_Detail_Page />
                </>
            ),
        },


        // Admin
        {
            path: "/admin-home",
            element: (
                <>
                    <Admin_Home />
                </>
            ),
        },
        {
            path: "/admin-add-doctor",
            element: (
                <>
                    <Admin_Add_Doctor_Page />
                </>
            ),
        },
        {
            path: "/doctors-list",
            element: (
                <>
                    <All_Doctors_List />
                </>
            ),
        },

        // Users
        {
            path: "/user-login",
            element: (
                <>
                    <User_Login />
                </>
            ),
        },
        
        {
            path: "/user/user-home",
            element: (
                <>
                    <User_Home />
                </>
            ),
        },
        {
            path: "/user/doctor/:id/scedule-appointment",
            element: (
                <>
                    <User_Scedule_Appointment />
                </>
            ),
        },
        {
            path: "/user/doctor/:id/schedule-appointment/patientid/:patientId/booking-slote",
            element: (
                <>
                    <Slote_Selection />
                </>
            ),
        },
        {
            path: "/user/doctor/:id/schedule-appointment/patientid/:patientId/booking-slote/sloteid/:selectedSlot/payment",
            element: (
                <>
                    <Payment />
                </>
            ),
        },
  /*    {
            path: "/user/view-scedule-appointments",
            element: (
                <>
                    <User_Scedule_Appointment />
                </>
            ),
        }, */
        {
            path: "/user/schedule-appointment",
            element: (
                <>
                    <All_Doctors_On_Home />
                </>
            ),
        },

    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;


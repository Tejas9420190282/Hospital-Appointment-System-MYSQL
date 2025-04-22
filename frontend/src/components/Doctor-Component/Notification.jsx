
// Notification.jsx (React)

import React, { useEffect, useState } from "react";
import Doctor_Navbar from "./Doctor_Navbar";
import axios from "axios";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const doctorId = sessionStorage.getItem("doctorId");

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/doctor/notification`,
                    { doctorId } // Send as body (POST)
                );

                if (response.data.success) {
                    setNotifications(response.data.notifications);
                }
            } catch (error) {
                console.error(`Error fetching notifications: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchNotification(); // Fetch only once when component mounts

    }, [doctorId]); // Re-fetch if doctorId changes

    return (
        <>
            <Doctor_Navbar />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Your Notifications</h2>
                
                {loading ? (
                    <p>Loading notifications...</p>
                ) : notifications.length === 0 ? (
                    <p>No new notifications</p>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <div 
                                key={notification.id}
                                className={`p-4 rounded-lg border ${
                                    notification.is_read 
                                    ? 'bg-gray-50' 
                                    : 'bg-blue-50 border-blue-200'
                                }`}
                            >
                                <p className="font-medium">{notification.message}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(notification.created_at).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Notification;

/* 
import React, { useEffect, useState } from "react";
import Doctor_Navbar from "./Doctor_Navbar";
import axios from "axios";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const doctorId = sessionStorage.getItem("doctorId");

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/doctor/notification?doctorId=${doctorId}`,
                     { doctorId }
                );

                console.log(response.data);
                

                if (response.data.success) {
                    setNotifications(response.data.notifications);
                }
            } catch (error) {
                console.error(`Error fetching notifications: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchNotification();
        const interval = setInterval(fetchNotification, 10000); // Poll every 10 seconds
        
        return () => clearInterval(interval);
    }, [doctorId]);

    return (
        <>
            <Doctor_Navbar />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Your Notifications</h2>
                
                {loading ? (
                    <p>Loading notifications...</p>
                ) : notifications.length === 0 ? (
                    <p>No new notifications</p>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <div 
                                key={notification.id}
                                className={`p-4 rounded-lg border ${
                                    notification.is_read 
                                    ? 'bg-gray-50' 
                                    : 'bg-blue-50 border-blue-200'
                                }`}
                            >
                                <p className="font-medium">{notification.message}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(notification.created_at).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Notification;
 */

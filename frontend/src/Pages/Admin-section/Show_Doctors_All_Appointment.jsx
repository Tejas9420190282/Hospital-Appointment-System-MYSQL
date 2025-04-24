// Show_Doctors_All_Appointment.jsx (React)

import axios from "axios";
import React, { useEffect, useState } from "react";

function Show_Doctors_All_Appointment() {
    const [allAppointment, setAllAppointment] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const responce = await axios.get(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/show_All_Doctors_Appointment_To_Admin_Router`
                );

                if (responce.data.success) {
                    setAllAppointment(responce.data.appointmentList);
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointment();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                All Doctors' Appointments
            </h1>

            {loading ? (
                <p>Loading appointments...</p>
            ) : allAppointment.length === 0 ? (
                <p>No appointments found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border">ID</th>
                                <th className="py-2 px-4 border">Date</th>
                                <th className="py-2 px-4 border">Slot ID</th>
                                <th className="py-2 px-4 border">Doctor ID</th>
                                <th className="py-2 px-4 border">Patient ID</th>
                                <th className="py-2 px-4 border">
                                    Payment Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allAppointment.map((appointment) => (
                                <tr
                                    key={appointment.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="py-2 px-4 border">
                                        {appointment.id}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {new Date(
                                            appointment.date
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {appointment.slote_id}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {appointment.doctor_id}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {appointment.patient_id}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {appointment.payment}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Show_Doctors_All_Appointment;

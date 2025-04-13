
// User_View_Scedule_Appointment.js (React)

import React, { useState } from "react";
import User_Navbar from "../../components/User_Component/User_Navbar";
import axios from "axios";

function User_View_Scedule_Appointment() {
    const [sloteId, setSloteId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [patientId, setPatientId] = useState("");
    const [appointmentData, setAppointmentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/view-scedule-appointment`, {
                params: {
                    sloteId,
                    doctorId,
                    patientId,
                }    
            });

            if (response.data.success) {
                setAppointmentData(response.data);
            } else {
                setError(response.data.message || "Failed to fetch data");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <User_Navbar />
            
            <div className="min-h-screen bg-gray-100 p-8">
                <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">View Scheduled Appointment</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slot ID
                            </label>
                            <input
                                type="number"
                                placeholder="Enter slot ID"
                                className="w-full px-4 py-2 border rounded-md"
                                value={sloteId}
                                onChange={(e) => setSloteId(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Doctor ID
                            </label>
                            <input
                                type="number"
                                placeholder="Enter doctor ID"
                                className="w-full px-4 py-2 border rounded-md"
                                value={doctorId}
                                onChange={(e) => setDoctorId(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Patient ID
                            </label>
                            <input
                                type="number"
                                placeholder="Enter patient ID"
                                className="w-full px-4 py-2 border rounded-md"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "View Appointment"}
                        </button>

                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}
                    </div>
                </form>

                {appointmentData && (
                    <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">Slot Details</h3>
                        <div className="mb-4">
                            <p><span className="font-medium">Start Time:</span> {appointmentData.slote.start_time}</p>
                            <p><span className="font-medium">End Time:</span> {appointmentData.slote.end_time}</p>
                            <p><span className="font-medium">Status:</span> {appointmentData.slote.status}</p>
                        </div>

                        <h3 className="text-lg font-semibold mb-2">Patient Details</h3>
                        <div>
                            <p><span className="font-medium">Name:</span> {appointmentData.patient.name}</p>
                            <p><span className="font-medium">Contact:</span> {appointmentData.patient.contact}</p>
                            <p><span className="font-medium">Address:</span> {appointmentData.patient.address}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default User_View_Scedule_Appointment;


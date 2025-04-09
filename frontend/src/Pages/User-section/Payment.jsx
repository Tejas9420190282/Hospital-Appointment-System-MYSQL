
// Payment.jsx (React)
/* 
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Payment() {
    const { id, patientId, selectedSlot } = useParams();
    const [doctorFees, setDoctorFees] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const [message, setMessage] = useState();

    useEffect(() => {
        // Get fees from sessionStorage when component mounts
        const fees = sessionStorage.getItem("fees");
        if (fees) {
            setDoctorFees(fees);
        }

        const date = sessionStorage.getItem("date");
        if (date) {
            setSelectedDate(date);
        }

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/payment`,
                { id, patientId, selectedSlot, selectedDate  }
            );



            // Handle payment response
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Doctor Fees</label>
                    <input
                        type="number"
                        value={doctorFees || ""}
                        className="w-full p-2 border rounded bg-gray-100"
                        readOnly
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
}

export default Payment;
 */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Payment() {
    const { id, patientId, selectedSlot } = useParams();
    const [doctorFees, setDoctorFees] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fees = sessionStorage.getItem("fees");
        if (fees) setDoctorFees(fees);

        const date = sessionStorage.getItem("date");
        if (date) setSelectedDate(date);
    }, []);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        try {
            // 1. Load Razorpay script
            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) {
                setMessage("Razorpay SDK failed to load");
                return;
            }

            // 2. Create order and process payment
            const orderResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/create-razorpay-order`,
                {
                    amount: doctorFees * 100, // Convert to paise
                    doctorId: id,
                    patientId,
                    slotId: selectedSlot,
                    date: selectedDate
                }
            );

            if (!orderResponse.data.success) {
                setMessage("Failed to create payment order");
                return;
            }

            // 3. Razorpay checkout options
            const options = {
                key: "rzp_test_6Pg8m8ifI60Xmi", // Your Razorpay key_id
                amount: orderResponse.data.order.amount,
                currency: "INR",
                name: "Your Clinic Name",
                description: "Appointment Booking",
                order_id: orderResponse.data.order.id,
                handler: async function(response) {
                    // 4. Verify payment and create appointment
                    try {
                        const verification = await axios.post(
                            `${import.meta.env.VITE_BACKEND_URL}/payment`,
                            {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                doctorId: id,
                                patientId,
                                slotId: selectedSlot,
                                date: selectedDate
                            }
                        );

                        if (verification.data.success) {
                            setMessage("Payment successful! Appointment booked.");
                        } else {
                            setMessage("Payment verification failed");
                        }
                    } catch (error) {
                        console.error("Verification error:", error);
                        setMessage("Error verifying payment");
                    }
                },
                prefill: {
                    name: "Patient Name",
                    email: "patient@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            // 5. Open Razorpay checkout
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment error:", error);
            setMessage("Payment failed. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            
            <div className="mb-6 space-y-4">
                <div>
                    <label className="block mb-2">Doctor Fees</label>
                    <input
                        type="number"
                        value={doctorFees || ""}
                        className="w-full p-2 border rounded bg-gray-100"
                        readOnly
                    />
                </div>
                
                <button
                    onClick={handlePayment}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                    Pay ₹{doctorFees}
                </button>
                
                {message && (
                    <p className={`text-center ${
                        message.includes("success") ? "text-green-600" : "text-red-600"
                    }`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Payment;




// payment_Controller.js (Node)

const { mySqlPool } = require("../../config/db");
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: "rzp_test_6Pg8m8ifI60Xmi",
    key_secret: "9cLSFrLUCm0hJnwfbs0szhRK"
});

// Create Razorpay order
const createRazorpayOrder = async (req, res) => {
    try {
        const { amount, doctorId, patientId, slotId, date } = req.body;

        const options = {
            amount: amount, // amount in paise
            currency: "INR",
            receipt: `appt_${Date.now()}`,
            notes: {
                doctorId,
                patientId,
                slotId,
                date
            }
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({
            success: false,
            message: "Error creating payment order"
        });
    }
};

// Verify payment and create appointment
const payment_Controller = async (req, res) => {
    try {
        const { 
            razorpay_payment_id, 
            razorpay_order_id, 
            razorpay_signature,
            doctorId,
            patientId,
            slotId,
            date
        } = req.body;

        // Verify payment signature
        const expectedSignature = crypto
            .createHmac('sha256', razorpay.key_secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        // Create appointment
        const [appointmentResult] = await mySqlPool.query(
            "INSERT INTO appointment (date, slote_id, doctor_id, patient_id) VALUES (?, ?, ?, ?)",
            [date, slotId, doctorId, patientId]
        );

        console.log("Appointment created successfully");

        res.status(200).json({
            success: true,
            message: "Payment verified and appointment booked",
            appointmentId: appointmentResult.insertId
        });

    } catch (error) {
        console.error("Error in payment_Controller:", error);
        res.status(500).json({
            success: false,
            message: "Error processing payment"
        });
    }
};

module.exports = {
    payment_Controller,
    createRazorpayOrder
};

/* 
const { mySqlPool } = require("../../config/db");

const payment_Controller = async (req, res) => {
    try {
        const { id, patientId, selectedSlot, selectedDate } = req.body;

        console.log(req.body);
        

        if (!id || !patientId || !selectedSlot || !selectedDate) {
            console.log(`All the inputs are requird`.bgRed);
            return res.status(400).json({
                success: false,
                message: `All the inputs are requird`,
            });
        }

        const inserAppointment = await mySqlPool.query(
            "INSERT INTO appointment (date, slote_id, doctor_id, patient_id) VALUES (?, ?, ?, ?)",
            [selectedDate, selectedSlot, id, patientId, ]
        );

        console.log("Insert Appointment".bgGreen);
        

        return res.status(200).json({
            success: true,
            message : "Insert Appointment"
        });
    } catch (error) {
        console.log(`Error in payment_Controller API : ${error.message}`);
        res.status(500).json({
            success: false,
            message: `Error in payment_Controller API : ${error.message}`,
        });
    }
};

exports.payment_Controller = payment_Controller;




 */
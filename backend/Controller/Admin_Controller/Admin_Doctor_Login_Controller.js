// admin_Doctor_Login_Controller.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mySqlPool } = require("../../config/db");

const admin_Doctor_Login_Controller = async (req, res) => {
    const SECRET_KEY = "secret-key";

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log(`All the inputs are Mandatory....!`.bgRed);
        }

        console.log(req.body);

        const [adminData] = await mySqlPool.query(
            "SELECT * FROM admin WHERE email=?",
            [email]
        );

        const admin = adminData[0];

        if (admin) {
            if (password === admin.password) {
                const token = jwt.sign(
                    {
                        email: admin.email,
                        id: admin.id,
                        password: admin.password,
                    },
                    SECRET_KEY,
                    { expiresIn: "1h" }
                );

                console.log("Successfully Login the Admin".bgGreen);

                res.status(200).json({
                    success: true,
                    message: "Successfully Login the Admin",
                    redirect: "/admin-home",
                });
            }
        }

        const [doctorData] = await mySqlPool.query(
            "SELECT * FROM doctor WHERE email=?",
            [email]
        );

        const doctor = doctorData[0];
        if (doctor) {
            if (password === doctor.password) {
                const token = jwt.sign(
                    {
                        email: doctor.email,
                        id: doctor.id,
                        password: doctor.password,
                    },
                    SECRET_KEY,
                    { expiresIn: "1h" }
                );

                console.log("Successfully Login the Admin");

                return res.status(200).json({
                    success: true,
                    message: "Successfully Login the Doctor",
                    redirect: "/user-home",
                });
            }
        }
    } catch (error) {
        console.log(
            `Error in admin_Doctor_Login_Controller API : ${error.message}`
                .bgRed
        );

        res.status(400).json({
            success: false,
            message: `Error in admin_Doctor_Login_Controller API : ${error.message}`,
        });
    }
};

exports.admin_Doctor_Login_Controller = admin_Doctor_Login_Controller;

const express = require("express");

const authRouter = express.Router();
const {registerStudent,studentLogin,getOTPUser,  getMe, UpdatePassword, resendOtp} = require("../controllers/studentAuthController")
const {getAuthenticated}  = require("../middleware/auth");

/**
 * @swagger
 * /api/student/studentCreate:
 *   post:
 *     summary:  create a new student user
 *     description: Create a new student user in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the student.
 *               email:
 *                 type: string
 *                 description: The email of the student.
 *               password:
 *                 type: string
 *                 description: The password of the student.
 *     responses:
 *       201:
 *         description: Student Successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message indicating student creation status.
 *               data:
 *                 type: object
 *                 properties:
 *                     studentId:
 *                       type: string
 *                       description: Indicates if the student was created successfully.
 *       409:
 *         description: Email Already Exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message indicating student creation status.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   description: Error Message.
 */
authRouter.post("/studentCreate", registerStudent);

/**
 * @swagger
 * /api/student/studentLogin:
 *   post:
 *     summary:  Enable student user to login
 *     description: Enable student user to login to the application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentAdmission:
 *                 type: string
 *                 description: The admission number of the student.
 *               password:
 *                 type: string
 *                 description: The password of the student.
 *     responses:
 *       200:
 *         description: Success on Student Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message indicating student creation status.
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:   
 *                       type: string
 *                       description: The email of the student.
 *                     role:
 *                       type: string
 *                       description: The role of the student.
 *       400:
 *         description: Invalid Input(missing parameters).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   description: message containing the error.
 *       404:
 *         description: Resource Not Found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   description: Message with the error.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   description: Message with the error.
 */
authRouter.post("/studentLogin", studentLogin);

/**
 * @swagger
 * /api/student/getOTP:
 *   post:
 *     summary:  Get OTP for Student Create Account.
 *     description: Get OTP for Student Create Account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userOtp:
 *                 type: string
 *                 description: The otp sent to student email for verfication.
 *     responses:
 *       200:
 *         description: OTP Verified Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message indicating student creation status.
 *               data:
 *                 type: object
 *                 properties:
 *                     studentId:
 *                       type: string
 *                       description: Indicates if the student was created successfully.
 *       400:
 *         description: No student with given id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   description: Message with the error.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message with the error.
 */
authRouter.post("/getOTP",  getOTPUser);

/**
 * @swagger
 * /api/student/studentChangePassword:
 *   post:
 *     summary:  create a new student user
 *     description: Create a new student user in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The current password of the student.
 *               password:
 *                 type: string
 *                 description: The new password of the student.
 *     responses:
 *       200:
 *         description: Password Updated Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message indicating password change status.
 *       400:
 *         description: Invalid input No parameters given.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message with the error.
 *       404:
 *         description: No student with given Id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message with the error.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message with the error.
 */
authRouter.put("/studentChangePassword", getAuthenticated, UpdatePassword);

/**
 * @swagger
 * /api/student/resendOTP:
 *   post:
 *     summary:  Reset OTP for Student Create Account.
 *     description: Create a new student user in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the student.
 *     responses:
 *       200:
 *         description: Otp reset otp successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message indicating student creation status.
 *       400:
 *         description: Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message with the error.
 */
authRouter.post("/resendOTP", resendOtp);

module.exports = authRouter;
// http://localhost:5000/api/student/getMe




const express = require("express");

const authRouter = express.Router();
const {registerStudent,studentLogin,getOTPUser,  getMe, UpdatePassword, resendOtp} = require("../controllers/studentAuthController")
const {getAuthenticated}  = require("../middleware/auth");

/**
 * @swagger
 * /api/student/studentCreate:
 *   post:
 *     summary: create a new student user
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
 *                 description: The admission number of the student.
 *               email:
 *                 type: string
 *                 description: The admission number of the student.
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
 *                 data:
 *                   type: object
 *                   properties:
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
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message indicating student creation status.
 */
authRouter.post("/studentCreate", registerStudent);


/**
 * @swagger
 * /api/student/studentLogin:
 *   post:
 *     summary: Student Login
 *     description: Student Login.
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
 *               email:
 *                 type: string
 *                 description: The email of the student.
 *     responses:
 *       200:
 *         description: Success on Student Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: Boolean
 *                   description: Boolean value that indicates if the login was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     studentId:
 *                       type: string
 *                       description: The id of the student.
 *                 email:
 *                   type: string
 *                   description: The email of the student.
 *       400:
 *         description: Invalid Input(missing parameters).
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
 *       404:
 *         description: Resource Not Found.
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
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message indicating student creation status.
 */
authRouter.post("/studentLogin", studentLogin);

/**
 * @swagger
 * /api/student/getOTP:
 *   post:
 *     summary: Get OTP for Student Create Account
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
 *         description: Success on Student Account Creation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: Boolean
 *                   description: Boolean value that indicates if the login was successful.
 *                 msg:
 *                  type: string
 *                  description: Message indicating account verification status.
 *       400:
 *         description: OTP Value Does Not Match.
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
 */
authRouter.post("/getOTP",  getOTPUser);

/**
 * @swagger
 * /api/student/studentChangePassword:
 *   put:
 *     summary: Update Student Password
 *     description: Update Student Password.
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
 *                 description: the new password for the Student.
 *     responses:
 *       200:
 *         description: Success on Update Password for Student.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: Boolean
 *                   description: Boolean value that indicates if the login was successful.
 *                 msg:
 *                   type: string
 *                   description: Message indicating password update status.
 *       400:
 *         description: Invalid Parameters.
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
  *       404:
 *         description: Student Not found.
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
 *                   description: Indicates if the student was created successfully.
 *                 msg:
 *                   type: string
 *                   description: Message indicating student creation status.
 */
authRouter.put("/studentChangePassword", UpdatePassword);

/**
 * @swagger
 * /api/student/resendOTP:
 *   post:
 *     summary: Resent OTP for Student Create Account
 *     description: Resent OTP for Student Create Account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the student..
 *     responses:
 *       200:
 *         description: Success on Student Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: Boolean
 *                   description: Boolean value that indicates if the login was successful.
 *                 msg:
 *                   type: String
 *                  description: Message indicating OTP resend status.
 */
authRouter.post("/resendOTP", resendOtp);

module.exports = authRouter;
// http://localhost:5000/api/student/getMe

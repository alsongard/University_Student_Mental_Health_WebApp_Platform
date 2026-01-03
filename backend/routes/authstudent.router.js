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
 *         description: Created
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
 */
authRouter.post("/studentCreate", registerStudent);

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
 *         description: Created
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
 */
authRouter.post("/studentLogin", studentLogin);

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
 *         description: Created
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
 */
authRouter.post("/getOTP",  getOTPUser);

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
 *         description: Created
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
 */
authRouter.put("/studentChangePassword", UpdatePassword);

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
 *         description: Created
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
 */
authRouter.post("/resendOTP", resendOtp);

module.exports = authRouter;
// http://localhost:5000/api/student/getMe

import { Router } from "express"
import {  updatePassword, updateUser, updateProfilePicture } from "./user.controller.js"
import {  updatePasswordValidator, updatePPValidator, updateUserValidator } from "../middlewares/user-validator.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const router = Router()

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "SocialNet API",
            version: "1.0.0",
            description: "API for SocialNet application"
        },
        servers: [
            {
                url: "http://127.0.0.1:3001"
            }
        ]
    },
    apis: ["./src/user/user.routes.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

/**
 * @swagger
 * /socialMedia/v1/user/updatePassword:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated password
 *       400:
 *         description: Old password does not match or new password is the same as the old one
 *       500:
 *         description: Error updating password
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword)

/**
 * @swagger
 * /socialMedia/v1/user/updateUser:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated user
 *       403:
 *         description: You do not have permission to assign yourself as an administrator
 *       500:
 *         description: Error updating user
 */
router.put("/updateUser", updateUserValidator, updateUser)

/**
 * @swagger
 * /socialMedia/v1/user/updateProfPic:
 *   patch:
 *     summary: Update user profile picture
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               newProfilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated
 *       400:
 *         description: No file was uploaded
 *       500:
 *         description: Error updating profile picture
 */
router.patch("/updateProfPic", uploadProfilePicture.single("newProfilePic"), updatePPValidator, updateProfilePicture)

export default router
import User from "../user/user.model.js"
import { hash, verify } from "argon2"
import fs from "fs/promises"
import {join, dirname} from "path"
import { fileURLToPath } from "url"

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         surname:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         profilePicture:
 *           type: string
 *         role:
 *           type: string
 *           enum: ['ADMIN_ROLE', 'USER_ROLE']
 *         status:
 *           type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

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
export const updatePassword = async (req, res) => {
    try{
        const { usuario } = req
        const { password } = req.body
        const { newPassword } = req.body

        const oldPassword = await verify(usuario.password, password)


        if(!oldPassword){
            return res.status(400).json({
                success: false,
                msg: "Old password does not match"
            })
        }

        const user = await User.findById(usuario._id)

        const matchOldAndNewPassword = await verify(user.password, newPassword)

        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                msg: "The new password cannot be the same as the previous one"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(usuario._id, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            msg: "Updated password",
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            msg: "Error updating password",
            error: err.message
        })
    }
}

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
export const updateUser = async (req, res) => {
    try {
        const { usuario } = req;
        const  data  = req.body;

        if (data.role === "ADMIN_ROLE") {
            return res.status(403).json({ msg: "You do not have permission to assign yourself as an administrator" });
        }

        data.role = "USER_ROLE";
        const user = await User.findByIdAndUpdate(usuario._id, data, { new: true });


        res.status(200).json({
            success: true,
            msg: 'Updated user',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
}

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
export const updateProfilePicture = async (req, res) => {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    try{
        const {usuario} = req
        let newProfilePicture = req.file ? req.file.filename : null

        if(!newProfilePicture){
            return res.status(400).json({
                success: false,
                msg: "No file was uploaded"
            })
        }

        const user = await User.findById(usuario._id)

        if(user.profilePicture){
            const oldPic = join(__dirname, `../../public/uploads/profile-pictures/`,user.profilePicture)
            await fs.unlink(oldPic)
        }

        user.profilePicture = newProfilePicture
        await user.save()

        res.status(200).json({
            success: true,
            msg: "Profile picture updated",
        })
    }catch(err){
        res.status(500).json({
            success: false,
            msg: "Error updating profile picture",
            error: err.message
        })
    }
}
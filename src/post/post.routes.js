import { Router } from "express";
import { createPost, updatePost, deletePost } from "./post.controller.js";
import { createPostValidator, updtPostValidator, deletePostValidator } from "../middlewares/post-validator.js";
import { uploadPostImage } from "../middlewares/multer-uploads.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();

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
    apis: ["./src/post/post.routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /socialmedia/v1/post/addpost:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               postPicture:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               creator:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Error creating post
 */
router.post("/addpost", uploadPostImage.single("postPicture"), createPostValidator, createPost);

/**
 * @swagger
 * /socialmedia/v1/post/updtpost/{pid}:
 *   put:
 *     summary: Update an existing post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       400:
 *         description: Validation error
 *       500:
 *         description: Error updating post
 */
router.put("/updtpost/:pid", updtPostValidator, updatePost);

/**
 * @swagger
 * /socialmedia/v1/post/deletepost/{pid}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted
 *       400:
 *         description: Validation error
 *       500:
 *         description: Error deleting post
 */
router.delete("/deletepost/:pid", deletePostValidator, deletePost);

export default router;
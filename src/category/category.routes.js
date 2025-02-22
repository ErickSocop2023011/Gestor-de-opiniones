import { addCategoryValidator, updateCategoryValidator, deleteCategoryValidator} from "../middlewares/category-validator.js";
import { createCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { Router } from "express";
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
    apis: ["./src/category/category.routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /socialmedia/v1/category/addcategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Error creating category
 */
router.post("/addcategory", addCategoryValidator, createCategory);

/**
 * @swagger
 * /socialmedia/v1/category/updtcategory/{cid}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Validation error
 *       500:
 *         description: Error updating category
 */
router.put("/updtcategory/:cid", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /socialmedia/v1/category/deletecategory/{cid}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted
 *       400:
 *         description: Validation error
 *       500:
 *         description: Error deleting category
 */
router.delete("/deletecategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;
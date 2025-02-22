import { addCategoryValidator, updateCategoryValidator, deleteCategoryValidator} from "../middlewares/category-validator.js";
import { createCategory, updateCategory,deleteCategory } from "./category.controller.js";
import { Router } from "express";

const router = Router();

router.post("/addcategory", addCategoryValidator,createCategory);

router.put("/updtcategory/:cid", updateCategoryValidator,updateCategory);

router.delete("/deletecategory/:cid", deleteCategoryValidator, deleteCategory);
export default router;
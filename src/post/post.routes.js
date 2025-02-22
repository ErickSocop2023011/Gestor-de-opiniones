import { Router } from "express";
import { createPost, updatePost, deletePost } from "./post.controller.js";
import { createPostValidator, updtPostValidator, deletePostValidator } from "../middlewares/post-validator.js";
import { uploadPostImage } from "../middlewares/multer-uploads.js";

const router = Router();

router.post("/addpost", uploadPostImage.single("postPicture"), createPostValidator, createPost);

router.put("/updtpost/:pid", updtPostValidator, updatePost);

router.delete("/deletepost/:pid", deletePostValidator, deletePost);

export default router;
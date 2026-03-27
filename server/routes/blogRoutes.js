import express from "express"
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
  updateBlog
} from "../controllers/blogController.js"
import upload from "../middleware/multer.js"
import auth from "../middleware/auth.js"

// ✅ Router must be defined FIRST before using it
const blogRouter = express.Router()

// Public routes
blogRouter.get("/all", getAllBlogs)
blogRouter.get("/:blogId", getBlogById)
blogRouter.post("/add-comment", addComment)
blogRouter.post("/comments", getBlogComments)

// Admin routes
blogRouter.post("/add", auth, upload.single('image'), addBlog)
blogRouter.post("/delete", auth, deleteBlogById)
blogRouter.post("/toggle-publish", auth, togglePublish)
blogRouter.post("/generate", auth, generateContent)
blogRouter.put("/update/:id", auth, upload.single('image'), updateBlog)

export default blogRouter
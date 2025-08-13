// routes/categoryRoutes.js
const router = express.Router();
import express from "express";
import categoryController from "../controllers/categoryController.js";
// GET all categories
router.get("/", categoryController.getAllCategories);

// POST create new category
router.post("/", categoryController.createCategory);

// PUT update category
router.put("/:id", categoryController.updateCategory);

// DELETE category
router.delete("/:id", categoryController.deleteCategory);

export default router;

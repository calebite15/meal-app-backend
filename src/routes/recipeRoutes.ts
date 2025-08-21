import { Router } from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/Recipecontroller";

const router = Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;

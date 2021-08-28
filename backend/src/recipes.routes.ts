import express from "express";
import {
  getRecipesListe,
  createRecipe,
  createIngredients,
  getIngredientsListe,
  getRecipesByIngredient,
} from "./database";
import { Recipes, Ingredients } from "./models/recipesModel";
import { Request, Response } from "express";
const router = express.Router();

// Routes
router.get("/", (req: Request, res: Response) => {
  const recipes: Recipes[] = getRecipesListe();
  res.status(200).json({ recipes });
});

router.post("/add", (req: Request, res: Response) => {
  const recipe: Recipes = req.body;
  if (recipe) {
    const recipesReseult = createRecipe(recipe);
    res.status(201);
    res.json({ recipesReseult, message: "RECIPE REGISTERED" });
  } else {
    res.status(500);
    res.json({ message: "SOMETHING WENT WRONG" });
  }
});

router.post("/add/ingredient", (req: Request, res: Response) => {
  const ingredient: Ingredients = req.body;
  if (ingredient) {
    const IngredientReseult = createIngredients(ingredient);
    res.status(201);
    res.json({ IngredientReseult, message: "INGREDIENT REGISTERED" });
  } else {
    res.status(500);
    res.json({ message: "SOMETHING WENT WRONG" });
  }
});

router.get("/get/ingredient", (req: Request, res: Response) => {
  const ingredients: Ingredients[] = getIngredientsListe();
  res.status(200).json({ ingredients });
});

router.get("/get/ingredient/:ingredient", (req: Request, res: Response) => {
  const { ingredient } = req.params;
  const recipesFiltered = getRecipesByIngredient(ingredient);
  res.status(200);
  res.json({ recipesFiltered });
});

export default router;

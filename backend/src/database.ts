import path from "path";
import low from "lowdb";
var uuid = require("uuid");
import FileSync from "lowdb/adapters/FileSync";
import { RecipesModel, Recipes, Ingredients } from "./models/recipesModel";
import { DbSchema } from "./models/db-schema";

export type TDatabase = {
  recipes: Recipes[];
};

// DEFINING THE DATABASE LOCATION
const databaseFile = path.join(__dirname, "./data.json");
const adapter = new (FileSync as any)(databaseFile);
const db: any = low(adapter);

const RECIPES_TABLE = "recipes";
const INGREDIENTS_TABLE = "ingredients";

function saveContent<T>(data: T, table: string): void {
  db.get(table).push(data).write();
}
const getElementFromDB = (table: string) => db.get(table).value();

export const getAllBy = (entity: keyof DbSchema, key: string, value: any) => {
  const result = db
    .get(entity)
    .filter({ [`${key}`]: value })
    .value();
  return result;
};

//RECIPES AND INGREDIENTS QUERIES
export const getRecipesListe = (): RecipesModel["RecipesListe"] =>
  getElementFromDB(RECIPES_TABLE);
export const getIngredientsListe = (): RecipesModel["Ingredients"] =>
  getElementFromDB(INGREDIENTS_TABLE);
export const getRecipesBy = (key: string, value: string) =>
  getAllBy(RECIPES_TABLE, key, value);

export const getRecipesByIngredient = (
  ingredientName: string
): RecipesModel["Ingredients"] => getRecipesBy("ingredient", ingredientName);
export const createRecipe = (recipe: Recipes): Recipes => {
  const recipeModel: Recipes = {
    id: uuid.v4(),
    recipeName: recipe.recipeName,
    recipeDesription: recipe.recipeDesription,
    preparationTime: recipe.preparationTime,
    addDate: recipe.addDate,
    ingredient: recipe.ingredient,
  };

  saveContent(recipeModel, RECIPES_TABLE);
  return recipeModel;
};

export const createIngredients = (ingredient: Ingredients): Ingredients => {
  const ingredientModel: Ingredients = {
    id: uuid.v4(),
    name: ingredient.name,
  };

  saveContent(ingredientModel, INGREDIENTS_TABLE);
  return ingredientModel;
};

export default db;

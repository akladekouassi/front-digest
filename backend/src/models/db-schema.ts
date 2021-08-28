import { RecipesModel, Ingredients } from './recipesModel';

export interface DbSchema {
  recipes: RecipesModel;
  ingredients: Ingredients;
}

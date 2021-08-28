export interface RecipesModel {
  RecipesListe: Recipes[];
  Ingredients: Ingredients[];
}
export interface Recipes {
  id: number | string;
  recipeName: string;
  recipeDesription: string;
  preparationTime: string;
  addDate: Date;
  ingredient: string;
}

export interface Ingredients {
  id: number | string;
  name: string;
}

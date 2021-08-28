export enum Kind {
  AddRecipeDataAction,
  AddIngredientsAction,
  FetchIngredientsAction,
  FetchRecipesDataAction,
}

export type Action =
  | { type: Kind.AddRecipeDataAction; payload: string | Date | boolean; fieldName: string }
  | { type: Kind.AddIngredientsAction; payload: string, fieldName: string }
  | { type: Kind.FetchIngredientsAction; payload: { id: string; name: string }[] }
  | { type: Kind.FetchRecipesDataAction; payload: any };

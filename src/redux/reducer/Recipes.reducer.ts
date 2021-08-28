import { Kind, Action } from '../actions/index';

export interface RecipesGeneralData {
  addRecipe: {
    recipeName: string;
    recipeDesription: string;
    preparationTime: string;
    addDate: Date;
    ingredient: string;
  };
  RecipesFeched: RecipesGeneralData['addRecipe'][];
  Ingredients: { id: string; name: string };
  IngredientFeched: RecipesGeneralData['Ingredients'][];
}

export interface RecipesState {
  Recipe: RecipesGeneralData['addRecipe'];
  RecipesFeched: RecipesGeneralData['RecipesFeched'];
  Ingredients: RecipesGeneralData['Ingredients'];
  IngredientFeched: RecipesGeneralData['IngredientFeched'];
}

const RecipesInitialState: RecipesState = {
  Recipe: {
    recipeName: '',
    recipeDesription: '',
    preparationTime: '',
    addDate: new Date(),
    ingredient: '',
  },
  RecipesFeched: [],
  Ingredients: { id: '', name: '' },
  IngredientFeched: [],
};

const RecipesReducer = (state: RecipesState = RecipesInitialState, action: Action): RecipesState => {
  switch (action.type) {
    case Kind.AddRecipeDataAction: {
      return {
        ...state,
        Recipe: { ...state.Recipe, [action.fieldName]: action.payload },
      };
    }
      case Kind.AddIngredientsAction: {
      return {
        ...state,
        Ingredients: { ...state.Ingredients, [action.fieldName]: action.payload },
      };
    }
    case Kind.FetchRecipesDataAction: {
      return {
        ...state,
        RecipesFeched: action.payload,
      };
    }
      case Kind.FetchIngredientsAction: {
      return {
        ...state,
        IngredientFeched: action.payload,
      };
    }

    default:
      return state;
  }
};

export default RecipesReducer;

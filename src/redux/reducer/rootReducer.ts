import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import RecipesReducer from './Recipes.reducer';

export interface ReducerMapType {
  router: any;
  Recipes: any;
}

export const rootReducer = (history: History): any => {
  const reducerMap: ReducerMapType = {
    router: connectRouter(history),
    Recipes: RecipesReducer,
  };
  return combineReducers(reducerMap);
};

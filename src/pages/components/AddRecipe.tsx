import React, { Dispatch, ChangeEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, Box, Typography } from '@material-ui/core';

import { Grid } from '@material-ui/core';
import { FormsControl } from '../../components/forms';
// import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RecipesGeneralData } from '../../redux/reducer/Recipes.reducer';
import { Kind, Action } from '../../redux/actions/index';
import { useMutation } from 'react-query';
import { ReducerMapType } from '../../redux/reducer/rootReducer';

const mapStateToProps = (state: ReducerMapType) => {
  return {
    Recipe: state.Recipes.Recipe,
    RecipesFechedFetched: state.Recipes.RecipesFeched,
    ingredient: state.Recipes.Ingredients,
    ingredientFeched:state.Recipes.IngredientFeched
  };
};

const mapDispatcherToProps = (dispatch: any) => {
  return {
    dispatchRecipeToStore: (value: string | Date | boolean, fieldName: string) =>
      dispatch({ type: Kind.AddRecipeDataAction, payload: value, fieldName }),
    dispatchIngredientToStore: (value: string, fieldName: string) => dispatch({ type: Kind.AddIngredientsAction, payload: value, fieldName }),
        fetchIngredientFromDataBaseToStore: (payload: RecipesGeneralData["Ingredients"][]) => dispatch({ type: Kind.FetchIngredientsAction, payload }),
  };
};


interface RecipesFormProps {
  Recipe: RecipesGeneralData['addRecipe'];
  RecipesFetched?: RecipesGeneralData['RecipesFeched'][];
  ingredient:RecipesGeneralData["Ingredients"]
  ingredientFeched:RecipesGeneralData["IngredientFeched"]
  dispatchRecipeToStore: (value: string | boolean | Date, fieldName: string) => Dispatch<Action>;
  dispatchIngredientToStore: (value: string, fieldName: string) => Dispatch<Action>;
    fetchIngredientFromDataBaseToStore: (payload: RecipesGeneralData["Ingredients"][]) => Dispatch<Action>;
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & RecipesFormProps;


const getIngredientData = async (): Promise<RecipesGeneralData["Ingredients"][]> => {
  const data = await fetch(`${process.env.REACT_APP_FAKE_API_URL}/recipes/get/ingredient`).then((res) => res.json());
  const { ingredients } = data;
  return ingredients;
};



const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));
const RecipesFormContainer: React.FunctionComponent<ReduxType> = ({
  Recipe,
  RecipesFetched,
  dispatchRecipeToStore,
  ingredient,
  ingredientFeched,
  dispatchIngredientToStore,
  fetchIngredientFromDataBaseToStore
}: RecipesFormProps): JSX.Element => {
  const classes = useStyles();
  const [renderCount, setRenderCount] = React.useState<number>(0)
  const mutationRecipes = useMutation(async () => {
    const res = await fetch(`${process.env.REACT_APP_FAKE_API_URL}/recipes/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Recipe),
    });
    return await res.json();
  });

  const mutationIngredient = useMutation(async () => {
    const res = await fetch(`${process.env.REACT_APP_FAKE_API_URL}/recipes/add/ingredient`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredient),
    });
    return await res.json();
  });

  const ingredientsMemo = React.useMemo(() => {
    return ingredientFeched.map((data)=>({ value: data.name, label: data.name }))
  },[ingredientFeched])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any, fieldName: string) => {
    const value = fieldName !== 'addDate' ? (e.target.value as string) : e;
    dispatchRecipeToStore(value, fieldName);
  };

   const handleAddIngredient = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any, fieldName: string) => {
  
    dispatchIngredientToStore(e.target.value as string, fieldName);
  };

  const handleOnBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any, fieldName: string) =>
    dispatchRecipeToStore(e.target.value, fieldName);
  

  const handleMutateRecipe = async () => {
    setRenderCount((prev)=>prev + 1)
    try {
      await mutationRecipes.mutateAsync();
    } catch (error) {}
  };

  const handleMutateIngredient = async () => {
    setRenderCount((prev)=>prev + 1)
    try {
      await mutationIngredient.mutateAsync();
    } catch (error) {}
  };

  React.useEffect(() => {
    getIngredientData().then((data: RecipesGeneralData["Ingredients"][]) => {
      fetchIngredientFromDataBaseToStore(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div key={renderCount}>
      <PageHeader title="Ajouter une nouvelle recette" subTitle="" icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />
      <Paper className={classes.pageContent}>
          <Grid container spacing={4}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Box mb={3}>
                <Typography variant="h2" component="h2">
                  Ajouter une nouvelle recette
                </Typography>
              </Box>
              <FormsControl.OutlinedInput
                defaultValue={Recipe.recipeName}
                isError={false}
                isRequired={true}
                hint="Nom de la recette"
                htmlFor="recipeName"
                onBlur={(e:any) => handleOnBlur(e, 'recipeName')}
              />
              <FormsControl.OutlinedInput
                defaultValue={Recipe.recipeDesription}
                isError={false}
                isRequired={true}
                hint="Description de la recette"
                htmlFor="recipeDesription"
                onBlur={(e) => handleOnBlur(e, 'recipeDesription')}
              />
              <FormsControl.OutlinedInput
                defaultValue={Recipe.preparationTime}
                isError={false}
                isRequired={true}
                hint="Temps de préparation"
                htmlFor="preparationTime"
                onBlur={(e) => handleOnBlur(e, 'preparationTime')}
              />
              <FormsControl.Select
                label="Department"
                isError={false}
                isRequired={true}
                hint="ingredient"
                htmlFor="Ingredient"
                value={Recipe.ingredient}
                onChange={(e) => handleOnChange(e, 'ingredient')}
                options={ingredientsMemo}
              />
              
              <FormsControl.DatePicker
                htmlFor="addDate"
                label="Date d'ajout"
                value={Recipe.addDate}
                onChange={(e) => handleOnChange(e, 'addDate')}
              />
              <div>
                <FormsControl.Button type="submit" text="Valider" onClick={handleMutateRecipe} />
                <FormsControl.Button type="reset" text="Reset" color="default" onClick={(e) => console.log(e)} />
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Box mb={3}>
                {' '}
                <Typography variant="h2" component="h2">
                  Ajouter un nouvel ingredient
                </Typography>{' '}
              </Box>
              <FormsControl.OutlinedInput
                defaultValue={Recipe.ingredient}
                isError={false}
                isRequired={true}
                hint="Nom de l'ingredient"
                htmlFor="name"
                onBlur={(e) => handleAddIngredient(e, 'name')}
              />
             
              <div>
                <FormsControl.Button type="submit" text="Valider" onClick={handleMutateIngredient} />
                <FormsControl.Button type="reset" text="Reset" color="default" onClick={(e) => console.log(e)} />
              </div>
            </Grid>
          </Grid>
    
      </Paper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatcherToProps)(RecipesFormContainer);

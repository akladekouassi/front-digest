import React, { Dispatch } from 'react';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PageHeader from '../../components/PageHeader';
import { RecipesGeneralData } from '../../redux/reducer/Recipes.reducer';
import { connect } from 'react-redux';
import { Kind, Action } from '../../redux/actions/index';
import { ReducerMapType } from '../../redux/reducer/rootReducer';
import { makeStyles } from '@material-ui/core/styles';
import { RecipeCard } from "../../components/RecipeCard";
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const mapStateToProps = (state: ReducerMapType) => {
  return {
    recipesListe: state.Recipes.RecipesFeched,
  };
};

const mapDispatcherToProps = (dispatch: any) => {
  return {
    fetchFromDataBaseToStore: (payload: RecipesGeneralData['addRecipe'][]) => dispatch({ type: Kind.FetchRecipesDataAction, payload }),
  };
};

const getRecipesData = async (): Promise<RecipesGeneralData['addRecipe'][]> => {
  const data = await fetch(`${process.env.REACT_APP_FAKE_API_URL}/recipes`).then((res) => res.json());
  const { recipes } = data;
  return recipes;
};

interface RecipesListProps {
  recipesListe: RecipesGeneralData['RecipesFeched'];
  fetchFromDataBaseToStore: (payload: RecipesGeneralData['addRecipe'][]) => Dispatch<Action>;
}

const RecipesListContainer: React.FC<RecipesListProps> = ({ recipesListe, fetchFromDataBaseToStore }: RecipesListProps) => {
  React.useEffect(() => {
    getRecipesData().then((data: RecipesGeneralData['addRecipe'][]) => {
      
      fetchFromDataBaseToStore(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <PageHeader title="Liste des recettes" subTitle="" icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />
       <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={4}>
          {recipesListe!?.map((data)=><Grid item xs={3} sm={3} md={3} lg={3}><RecipeCard data={data}/></Grid>)}
        </Grid>
      </Grid>
     
    </React.Fragment>
  );
};

//CONNECT COMPONENT TO THE STORE
export default connect(mapStateToProps, mapDispatcherToProps)(RecipesListContainer);

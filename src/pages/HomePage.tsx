import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import RecipesListContainer from './components/RecipesListe';
import RecipesFormContainer from './components/AddRecipe';
import CoolTabs from 'react-cool-tabs';

const useStyles = makeStyles({
  appMain: {
    width: '100%',
  },
});

const HomePage: React.FunctionComponent = (): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.appMain}>
        <Header />
        <React.Fragment>
          <CoolTabs
            tabKey={'1'}
            style={{ width: '100%', height: 800, background: 'white' }}
            activeTabStyle={{ background: '#fca42d', color: 'white' }}
            unActiveTabStyle={{ background: '#7d7d7d', color: 'black', cursor: 'pointer' }}
            leftTabTitle={'Liste des recettes'}
            rightTabTitle={'Ajouter une recette'}
            leftContent={<RecipesListContainer />}
            rightContent={<RecipesFormContainer />}
          />
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export { HomePage as Unconnected };
export default connect(null, null)(HomePage);

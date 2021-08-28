import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { RecipesGeneralData } from '../redux/reducer/Recipes.reducer';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface RecipeCardProps{
    data: RecipesGeneralData["addRecipe"];
}

export const RecipeCard:React.FunctionComponent<RecipeCardProps> = ({data}:RecipeCardProps) => {
  const classes = useStyles();

    return (
                <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="empty"
          title="Recipe Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.recipeName}
          </Typography>
                  <div>
                      <Typography gutterBottom variant="h5" component="h2">
            Description:
          </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
            {data.recipeDesription}
          </Typography>
                    </div>
                    <div>
                      <Typography gutterBottom variant="h5" component="h2">
            Temps de cuisson:
          </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
            {data.preparationTime}
          </Typography>
                    </div>
                    <div>
                      <Typography gutterBottom variant="h5" component="h2">
            Date d'ajout:
          </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
            {data.addDate}
          </Typography>
          </div>
        </CardContent>
      </CardActionArea>
     
    </Card>
                
    
  );
}
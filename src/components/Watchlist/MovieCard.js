import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

import DeleteMovieIcon from "./DeleteMovieIcon";

const useStyles = makeStyles({
  root: {
    maxWidth: '80%',
  },
  media: {
    height: 160,
  },
});

export default function MediaCard({ watchlistItem, updateWatchlist }) {
  const classes = useStyles();
  const posterUrl =  `https://image.tmdb.org/t/p/original/${watchlistItem.posterUrl}`

  return (
    <Card className={classes.root}>
      <CardHeader
       action={
           <DeleteMovieIcon movieId={watchlistItem.movieId} updateWatchlist={updateWatchlist} />
       }
       title={watchlistItem.title}
       />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={posterUrl}
          title="Movie Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Imdb rating: {watchlistItem.imdbRating}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {watchlistItem.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {false && <Button size="small" color="primary">
          Add to watched items
        </Button>}
      </CardActions>
    </Card>
  );
}

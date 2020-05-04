import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

import MovieRatings from "./MovieRatings";
import MovieActionButtons from "./MovieActionButtons";
import Note from "./Note";

const useStyles = makeStyles({
  root: {
    width: '80%',
  },
  media: {
    height: 160,
  },
});

export default function MediaCard({ watchlistItem, updateWatchlist }) {
  const classes = useStyles();
  const posterUrl =  `https://image.tmdb.org/t/p/original/${watchlistItem.posterUrl}`;

  return (
    <Card className={classes.root}>
      <CardHeader
          action={
              <MovieActionButtons watchlistItem={watchlistItem} updateWatchlist={updateWatchlist} />
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
               { watchlistItem.watched ?
                   <Note watchlistItem={watchlistItem} updateWatchlist={updateWatchlist}/> :
                   <Typography variant="body2" color="textSecondary" component="p">
                       {watchlistItem.description}
                   </Typography>
               }
            </CardContent>
        </CardActionArea>

        <CardActions>
            <MovieRatings watchlistItem={watchlistItem} updateWatchlist={updateWatchlist} />
        </CardActions>
    </Card>
  );
}

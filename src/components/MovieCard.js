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
import MoreVertIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import { API } from "aws-amplify";

const img = require('../static/example-movie-image.jpg');

const useStyles = makeStyles({
  root: {
    maxWidth: '80%',
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ title, movieId, deletingCallback, setDeletingCallback }) {
  const classes = useStyles();

  const deleteNote = () => {
    return API.del("moviecollections-api", `/usermovie/${movieId}`);
  }

  const handleDelete = async(event) => {
    event.preventDefault();
    try {
      await deleteNote();
      setDeletingCallback(!deletingCallback);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <Card className={classes.root}>
      <CardHeader
       action={
         <IconButton aria-label="delete" onClick={handleDelete}>
           <MoreVertIcon />
         </IconButton>
       }
       title={title}
       />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title="Movie Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Imdb rating
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Movie information. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
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

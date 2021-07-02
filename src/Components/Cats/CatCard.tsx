import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt';

import { CatImage } from '../../Types/catImage';

type PropsType = {
  image: CatImage;
};

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
  },
});

const CatCard: React.FC<PropsType> = ({ image }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="345"
          alt={image.original_filename}
          image={image.url}
          title={image.original_filename}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {image.original_filename}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton size="small" color="primary">
          <FavoriteIcon />
        </IconButton>
        <IconButton size="small" color="primary">
          <ThumbUpIcon />
        </IconButton>
        <IconButton size="small" color="primary">
          <ThumbDownIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CatCard;

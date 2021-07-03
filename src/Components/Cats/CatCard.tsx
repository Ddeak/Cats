import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt';

import { CatImage } from '../../Types/catImage';
import { isCatImageFavourited } from '../../State/selectors';

type PropsType = {
  image: CatImage;
  onFavouriteClick: (imageId: string, favourite_id?: number) => void;
  onVoteClick: (vote: 0 | 1, imageId: string) => void;
};

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
  },
});

const CatCard: React.FC<PropsType> = ({
  image,
  onFavouriteClick,
  onVoteClick,
}) => {
  const classes = useStyles();
  const favourite_id = useSelector(isCatImageFavourited(image.id));

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
        <IconButton
          aria-label="favourite"
          onClick={() => onFavouriteClick(image.id, favourite_id)}
          size="small"
          color="primary"
        >
          {favourite_id ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton
          aria-label="upVote"
          onClick={() => onVoteClick(1, image.id)}
          size="small"
          color="primary"
        >
          <ThumbUpIcon />
        </IconButton>
        <IconButton
          aria-label="downVote"
          onClick={() => onVoteClick(0, image.id)}
          size="small"
          color="primary"
        >
          <ThumbDownIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CatCard;

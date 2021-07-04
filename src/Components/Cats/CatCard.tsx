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
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

import { CatImage } from '../../Types/catImage';
import { getVoteForImage, isCatImageFavourited } from '../../State/selectors';
import { Vote, VoteValue } from '../../Types/vote';

type PropsType = {
  image: CatImage;
  onFavouriteClick: (imageId: string, favourite_id?: number) => void;
  onVoteClick: (image_id: string, newValue: VoteValue, vote?: Vote) => void;
  loading: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320,
    width: 320,
  },
  actions: {
    justifyContent: 'space-between',
    borderTop: '1px solid',
    borderColor: theme.palette.primary.main,
  },
  score: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const CatCard: React.FC<PropsType> = ({
  image,
  onFavouriteClick,
  onVoteClick,
  loading,
}) => {
  const classes = useStyles();
  const favourite_id = useSelector(isCatImageFavourited(image.id));
  const [vote, score] = useSelector(getVoteForImage(image.id));

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.media}>
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
      <CardActions className={classes.actions}>
        <IconButton
          aria-label="favourite"
          onClick={() => onFavouriteClick(image.id, favourite_id)}
          size="small"
          color="primary"
          disabled={loading}
        >
          {favourite_id ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton
          aria-label="upVote"
          onClick={() => onVoteClick(image.id, 1, vote)}
          size="small"
          color="primary"
          disabled={loading}
        >
          {vote?.value === 1 ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
        </IconButton>
        <IconButton
          aria-label="downVote"
          onClick={() => onVoteClick(image.id, 0, vote)}
          size="small"
          color="primary"
          disabled={loading}
        >
          {vote?.value === 0 ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
        </IconButton>

        <div className={classes.score}>
          <Typography>
            <strong>Score</strong>
          </Typography>
          <Typography>{score}</Typography>
        </div>
      </CardActions>
    </Card>
  );
};

export default CatCard;

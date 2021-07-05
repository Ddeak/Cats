import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';

import CatCard from './CatCard';

import { Vote, VoteValue } from '../../Types/vote';
import { CatImage } from '../../Types/catImage';

type PropsType = {
  images: CatImage[];
  onNewImage: () => void;
  onFavouriteImage: (imageId: string, favourite_id?: number) => void;
  onVoteImage: (image_id: string, newValue: VoteValue, vote?: Vote) => void;
  imagesLoading: boolean;
  interactionLoading: boolean;
};

const CatList: React.FC<PropsType> = ({
  images,
  onNewImage,
  onFavouriteImage,
  onVoteImage,
  interactionLoading,
  imagesLoading,
}) => {
  return (
    <div className="container">
      <Typography variant="h2">Your Cats:</Typography>
      <Button
        className="button"
        onClick={onNewImage}
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
      >
        Upload New
      </Button>

      {imagesLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {images.length > 0 ? (
            images.map((image) => (
              <Grid item key={image.id}>
                <CatCard
                  onFavouriteClick={onFavouriteImage}
                  onVoteClick={onVoteImage}
                  image={image}
                  loading={interactionLoading}
                />
              </Grid>
            ))
          ) : (
            <Typography>You have no images to display.</Typography>
          )}
        </Grid>
      )}
    </div>
  );
};

export default CatList;

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import { CatImage } from '../../Types/catImage';
import CatCard from './CatCard';
import { Vote, VoteValue } from '../../Types/vote';

type PropsType = {
  images: CatImage[];
  onNewImage: () => void;
  error?: string;
  onFavouriteImage: (imageId: string, favourite_id?: number) => void;
  onVoteImage: (image_id: string, newValue: VoteValue, vote?: Vote) => void;
  loading: boolean;
};

const CatList: React.FC<PropsType> = ({
  images,
  error,
  onNewImage,
  onFavouriteImage,
  onVoteImage,
  loading,
}) => {
  return (
    <div className="container">
      <Typography variant="h2">Your Cats:</Typography>
      {error && <div className="error">{error}</div>}

      <Grid container spacing={3}>
        {images.length > 0 ? (
          images.map((image) => (
            <Grid item key={image.id}>
              <CatCard
                onFavouriteClick={onFavouriteImage}
                onVoteClick={onVoteImage}
                image={image}
                loading={loading}
              />
            </Grid>
          ))
        ) : (
          <Typography>You have no images to display.</Typography>
        )}
      </Grid>

      <Button
        onClick={onNewImage}
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
      >
        Upload
      </Button>
    </div>
  );
};

export default CatList;

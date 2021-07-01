import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import { CatImage } from '../../Types/catImage';

type PropsType = {
  images: CatImage[];
  onNewImage: () => void;
  error?: string;
};

const renderCatImage = (image: CatImage) => {
  return (
    <div key={image.id} className="item">
      {image.original_filename}
    </div>
  );
};

const CatList: React.FC<PropsType> = ({ images, error, onNewImage }) => {
  return (
    <div className="container">
      <Typography variant="h2">Your Cats:</Typography>
      {error && <div className="error">{error}</div>}
      {images.length > 0 ? (
        images.map((image) => renderCatImage(image))
      ) : (
        <Typography>You have no images to display.</Typography>
      )}
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

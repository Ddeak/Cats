import React from 'react';
import Typography from '@material-ui/core/Typography';
import { CatImage } from '../../Types/catImage';

type PropsType = {
  images: CatImage[];
  error?: string;
};

const renderCatImage = (image: CatImage) => {
  return (
    <div key={image.id} className="item">
      {image.original_filename}
    </div>
  );
};

const CatList: React.FC<PropsType> = ({ images, error }) => {
  return (
    <div className="container">
      <Typography variant="h2">Your Cats:</Typography>
      {error && <div className="error">{error}</div>}
      {images.length > 0 ? (
        images.map((image) => renderCatImage(image))
      ) : (
        <Typography>You have no images to display.</Typography>
      )}
    </div>
  );
};

export default CatList;

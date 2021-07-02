import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Routes from '../../Layout/Routes';

import {
  favouriteImage,
  getCatImages,
  voteImage,
} from '../../Services/CatAPIService';
import { CatImage } from '../../Types/catImage';
import CatListView from './CatListView';

const CatList: React.FC = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [error, setError] = useState<string>();
  const history = useHistory();

  useEffect(() => {
    const fetchImages = async () => {
      const response = await getCatImages();
      if (!response) return;

      const [images, error] = response;
      if (error) setError(error.message);
      else setCatImages(images || []);
    };

    fetchImages();
  }, []);

  const onNewImage = () => history.push(Routes.Upload);

  const onFavouriteImage = async (image_id: string) => {
    const response = await favouriteImage(image_id);
    if (!response) return;

    const [_, error] = response;
    if (error) setError('Oops! We failed to favourite that image.');
  };

  const onVoteImage = async (vote: 0 | 1, image_id: string) => {
    const response = await voteImage(vote, image_id);
    if (!response) return;

    const [_, error] = response;
    if (error) setError('Oops! We failed to vote on that image.');
  };

  return (
    <CatListView
      images={catImages}
      error={error}
      onNewImage={onNewImage}
      onFavouriteImage={onFavouriteImage}
      onVoteImage={onVoteImage}
    />
  );
};

export default CatList;
